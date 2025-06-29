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

    console.log("✅ UPDATE selesai, lanjut SELECT...");
    // 2. Setelah update berhasil, ambil data siswa
    const selectSql = `
      SELECT 
          s.student_id, 
          s.name, 
          s.phone_number, 
          s.address, 
          s.total_meetings, 
          s.last_online, 
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

    console.log("🚀 Menjalankan SELECT query untuk ambil siswa...");

    db.query(selectSql, (selectErr, results) => {
      if (selectErr) {
        console.error("❌ Error fetching students:", selectErr);
        return res.status(500).json({ message: 'Database error', error: selectErr });
      }

      console.log("📥 Results dari SELECT:", results);

      // 🔍 Tambahkan informasi "last seen"
      const enriched = results.map((s) => {
        if (!s.last_online) return { ...s, last_seen: 'Never online' };

        const last = new Date(s.last_online);
        const now = new Date();
        const diffMinutes = Math.floor((now - last) / 60000);
        console.log(`🧪 ${s.name}`);
        console.log(`last_online (from DB): ${s.last_online}`);
        console.log(`last (parsed): ${last}`);
        console.log(`now: ${now}`);
        console.log(`selisih menit: ${diffMinutes}`);


        let label = '';
        if (diffMinutes < 1) label = 'Online now';
        else if (diffMinutes < 60) label = `${diffMinutes} minutes ago`;
        else if (diffMinutes < 1440) label = `${Math.floor(diffMinutes / 60)} hours ago`;
        else label = `${Math.floor(diffMinutes / 1440)} days ago`;

        return { ...s, last_seen: label };
      });

      console.log("📦 Data siswa + last_seen:", enriched);
      res.json(enriched);
    });
  });
});

// Endpoint hapus data siswa berdasarkan ID
router.delete('/api/students/:id', (req, res) => {
  const selectedStudentId = req.params.id;

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

// Endpoint ping dari siswa untuk update last_online
router.post('/ping', (req, res) => {
  console.log("📥 PING HIT!");
  console.log("🧾 SESSION:", req.session);

  const studentId = req.session.userId;
  const role = req.session.folderRole;

  if (!studentId) {
    console.log("❌ No userId in session");
    return res.status(401).json({ error: 'No session userId' });
  }

  if (role !== 'student') {
    console.log("⛔ Forbidden, role bukan student");
    return res.status(403).json({ error: 'Forbidden' });
  }

  const now = new Date();
  const sql = `UPDATE students SET last_online = ? WHERE student_id = ?`;
  db.query(sql, [now, studentId], (err) => {
    if (err) {
      console.error("❌ DB UPDATE ERROR:", err);
      return res.status(500).json({ error: 'DB update error' });
    }

    console.log(`✅ Updated last_online for student_id ${studentId} at ${now}`);
    res.sendStatus(200);
  });
});
export default router;
