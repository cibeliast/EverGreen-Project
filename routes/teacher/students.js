// routes/T_Student.js
import express from 'express';
import db from '../../db/db.js';


const router = express.Router();

// Endpoint ambil semua data siswa dari tabel `students`
router.get('/api/students', (req, res) => {
    // Optional: validasi session
    if (!req.session.userId || req.session.folderRole !== 'teacher') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const sql = 'SELECT * FROM students'; // Sesuaikan nama tabel kamu
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.json(results);
    });
});

export default router;
