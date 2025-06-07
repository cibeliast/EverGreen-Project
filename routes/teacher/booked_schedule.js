import express from 'express';
import db from '../../db/db.js';

const router = express.Router();

// Endpoint ambil data jadwal (day & time), nama guru, nama murid
router.get('/booked_schedule', (req, res) => {
    // Validasi session
    if(!req.session.userId || req.session.folderRole !== 'teacher'){
        return res.status(403).json({ message: 'Unauthorized'});
    }

    const sql = `
        SELECT 
        sc.day, sc.time, 
        tc.name AS teacher_name, 
        st.name AS student_name
        FROM schedules sc
        JOIN teachers tc ON sc.teacher_id = tc.teacher_id
        JOIN students st ON sc.student_id = st.student_id
        ORDER BY
        CASE sc.day
            WHEN 'Monday' THEN 1
            WHEN 'Tuesday' THEN 2
            WHEN 'Wednesday' THEN 3
            WHEN 'Thursday' THEN 4
            WHEN 'Friday' THEN 5
            WHEN 'Saturday' THEN 6
            WHEN 'Sunday' THEN 7
            ELSE 999
        END;
`;

    db.query(sql, (err, results) => {
        if(err){
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.json(results);
    });
});

export default router;
