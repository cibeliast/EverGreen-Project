import express from 'express';
import db from '../../db/db.js';

const router = express.Router();

// Endpoint ambil data id guru, nama siswa, total meetings, nominal (harga * total meetings), payment date, notes
router.get('/payment', (req, res) => {
    // Validasi session
    if(!req.session.userId || req.session.folderRole !== 'teacher'){
        return res.status(403).json({ message: 'Unauthorized'});
    }

    const teacherId = req.session.userId;
    console.log('teacherId:', teacherId);

    const sql = `
        SELECT 
        s.name AS student_name,
        COUNT(DISTINCT sc.schedule_id) AS total_meetings,
        p.nominal,
        p.date,
        p.note
        FROM students s
        INNER JOIN schedules sc ON s.student_id = sc.student_id AND sc.teacher_id = ?
        LEFT JOIN payments p ON s.student_id = p.student_id AND p.teacher_id = ?
        GROUP BY s.student_id, p.nominal, p.date, p.note;
        `;

    db.query(sql, [teacherId, teacherId], (err, results) => {
        if(err){
            return res.status(500).json({ message: 'Database error', error: err });
        }
       
       const formattedResults = results.map(row => ({
        ...row,
        date: row.date ? row.date.toISOString().split('T')[0] : null
     }));

    res.json(formattedResults);
    });
});

export default router;
