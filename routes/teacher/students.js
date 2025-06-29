// routes/teacher/students.js
import express from 'express';
import db from '../../db/db.js';

const router = express.Router();

// Endpoint ambil semua data siswa dari tabel `students`
router.get('/api/students', (req, res) => {
    if (!req.session.userId || req.session.folderRole !== 'teacher') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  
    // 1. Update total_meetings untuk semua siswa dulu
    const updateSql = `
      UPDATE students s
      LEFT JOIN (
          SELECT student_id, COUNT(*) AS total_meetings
          FROM schedules
          GROUP BY student_id
      ) sch_count ON s.student_id = sch_count.student_id
      SET s.total_meetings = IFNULL(sch_count.total_meetings, 0)
    `;
  
    db.query(updateSql, (updateErr) => {
      if (updateErr) {
        console.error("❌ Error updating total_meetings:", updateErr);
        return res.status(500).json({ message: 'Failed to update meetings', error: updateErr });
      }
  
      // 2. Setelah update berhasil, ambil data siswa
      const selectSql = `
        SELECT 
            s.student_id, 
            s.name, 
            s.phone_number, 
            s.address, 
            s.total_meetings, 
            GROUP_CONCAT(CONCAT(sch.day, ' ', sch.time) ORDER BY
              FIELD(LOWER(sch.day), 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'),
              sch.time
            SEPARATOR ', ') AS schedule
        FROM 
            students s
        LEFT JOIN 
            schedules sch ON s.student_id = sch.student_id
        GROUP BY 
            s.student_id
      `;
  
      db.query(selectSql, (selectErr, results) => {
        if (selectErr) {
          console.error("❌ Error fetching students:", selectErr);
          return res.status(500).json({ message: 'Database error', error: selectErr });
        }
  
        console.log("📦 Hasil dari DB:", results);
        res.json(results);
      });
    });
  });
  
// Endpoint hapus data siswa berdasarkan ID
router.delete('/api/students/:id', (req, res) => {
    const selectedStudentId = req.params.id;

    // Optional: validasi session
    if (!req.session.userId || req.session.folderRole !== 'teacher') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const sql = 'DELETE FROM students WHERE student_id = ?';
    db.query(sql, [selectedStudentId], (err, result) => {
        if (err) {
            console.error('Error deleting student:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully' });
    });
});

export default router;
