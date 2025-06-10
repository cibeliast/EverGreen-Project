import express from 'express';
import db from '../../db/db.js';

const router = express.Router();

// Endpoint ambil data id guru, nama siswa, total meetings, nominal (harga * total meetings), payment date, notes
router.get('/payment', (req, res) => {
  if (!req.session.userId || req.session.folderRole !== 'teacher') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const teacherId = req.session.userId;
  console.log('teacherId:', teacherId);

  const sql = `
    SELECT 
      s.name AS student_name,
      COUNT(DISTINCT sc.schedule_id) AS total_meetings,
      p.nominal,
      DATE_FORMAT(p.date, '%Y-%m-%d') AS date, -- Format langsung di SQL (YYYY-MM-DD)
      p.note
    FROM students s
    INNER JOIN schedules sc ON s.student_id = sc.student_id AND sc.teacher_id = ?
    LEFT JOIN payments p ON s.student_id = p.student_id AND p.teacher_id = ?
    GROUP BY s.student_id, p.nominal, p.date, p.note;
  `;

  db.query(sql, [teacherId, teacherId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    // Tidak perlu lagi format dengan JS, karena sudah di SQL
    res.json(results);
  });
});


router.post('/add_payment', (req, res) => {
  const { date, student_id, nominal, total_meetings } = req.body;
  const teacher_id = req.session.userId; // ambil dari session
  console.log('Received data:', req.body);

  console.log('TracherID add:', teacher_id)

  const note = `Paid for ${total_meetings} session`;

  const query = `
    INSERT INTO payments (student_id, teacher_id, nominal, date, note)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [student_id, teacher_id, nominal, date, note], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(200).json({ message: 'Payment added' });
  });
});


export default router;
