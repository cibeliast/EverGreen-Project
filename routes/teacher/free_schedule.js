import express from 'express';
import db from '../../db/db.js';

const router = express.Router();


router.get('/free_schedule', (req, res) => {
    if (!req.session.userId || req.session.folderRole !== 'teacher') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const sql = `
    SELECT 
        sc.schedule_id, sc.day, sc.time, 
        tc.name AS teacher_name, 
        st.name AS student_name,
        st.student_id AS student_id
    FROM schedules sc
    JOIN teachers tc ON sc.teacher_id = tc.teacher_id
    LEFT JOIN students st ON sc.student_id = st.student_id
    WHERE sc.student_id IS NULL
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
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.json(results);
    });
});


router.post('/free_schedule/update', (req, res) => {
    const { scheduleId, newStudentId } = req.body;

    if (!req.session.userId || req.session.folderRole !== 'teacher') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const sql = `
    UPDATE schedules
    SET student_id = ?
    WHERE schedule_id = ?;
    `;

    db.query(sql, [newStudentId, scheduleId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.json({ message: 'Schedule updated successfully' });
    });
});


export default router;