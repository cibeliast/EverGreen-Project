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
    s.name AS student_name, s.student_id,
    COUNT(DISTINCT sc.schedule_id) AS total_meetings,
    p.nominal, p.payment_id,
    DATE_FORMAT(p.date, '%Y-%m-%d') AS date,
    p.note
    FROM students s
    LEFT JOIN payments p ON s.student_id = p.student_id AND p.teacher_id = ?
    LEFT JOIN schedules sc ON s.student_id = sc.student_id AND sc.teacher_id = ?
    WHERE p.teacher_id = ?
    GROUP BY s.student_id, p.nominal, p.date, p.note, p.payment_id;
    `;

  db.query(sql, [teacherId, teacherId, teacherId], (err, results) => {
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

router.put('/payment/:id', (req, res) => {
  const teacher_id = req.session.userId;
  const { payment_id, student_id, total_meetings, nominal, date } = req.body;
  console.log('Teacher ID  UPdate', teacher_id);
  const note = `Paid for ${total_meetings} session`;

  const sql = `
    UPDATE payments
    SET student_id = ?, teacher_id = ?, nominal = ?, date = ?, note = ?
    WHERE payment_id = ?
  `;

  db.query(sql, [student_id, teacher_id, nominal, date, note, payment_id], (err, result) => {
    if (err) {
      console.error('Gagal update payment:', err);
      return res.status(500).json({ message: 'Gagal update payment' });
    }
    res.json({ message: 'Payment berhasil diupdate' });
  });
});

router.delete('/payment/:id', (req, res) => {
  const teacherId = req.session.userId;
  const paymentId = req.params.id;
 
  console.log('Payment: ', paymentId);

  if (!teacherId || req.session.folderRole !== 'teacher') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const sql = `
    DELETE FROM payments 
    WHERE payment_id = ? AND teacher_id = ?
  `;

  db.query(sql, [paymentId, teacherId], (err, result) => {
    if (err) {
      console.error('Gagal hapus payment:', err);
      return res.status(500).json({ message: 'Gagal hapus payment' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Payment tidak ditemukan atau bukan milik guru ini' });
    }

    res.json({ message: 'Payment berhasil dihapus' });
  });
});


export default router;
