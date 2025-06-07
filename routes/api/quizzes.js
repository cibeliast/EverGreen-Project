import express from 'express';
import db from '../../db/db.js';
const router = express.Router();

router.get('/quizzes', (req, res) => {
    const {topic_id} = req.query;

    if (!topic_id) {
        return res.status(400).json({ error: 'topic_id required'});
    }

    db.query(`SELECT * FROM quizzes where topic_id=?`, [topic_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }

        res.json(results);
    });
});

export default router;