import express from 'express';
import db from '../../db/db.js';

const router = express.Router();

router.get('/scheduleTeacherDashboard', (req, res) => {
    if(!req.session.userId) {
        return res.status(401).send('Unauthorized, please login!');
    }

    const userId = req.session.userId;
    const query = `SELECT 
                    s.day,
                    s.time,
                    st.name AS student_name
                    FROM schedules s
                    JOIN students st ON s.student_id = st.student_id
                    WHERE s.teacher_id = ?`;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        console.log('Fetched schedules:', results);
        res.json(results);
    });
});

export default router;