// routes/teacher/students.js
import express from 'express';
import db from '../../db/db.js';

const router = express.Router();

// Endpoint ambil semua data siswa dari tabel `students`
router.get('/students', (req, res) => {
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

// Endpoint hapus data siswa berdasarkan ID
router.delete('/students/:id', (req, res) => {
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
