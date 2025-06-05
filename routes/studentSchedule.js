import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/studentSchedule', (req, res) => {
    if(!req.session.userId) {
        return res.status(401).send('Unauthorized, pleas login!');
    }

    const userId = req.session.userId;
    const query = 'SELECT * FROM student_schedule_view WHERE student_id = ?';

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