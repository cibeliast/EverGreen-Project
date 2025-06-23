import express from 'express';
import db from '../../db/db.js';
const router = express.Router();

router.get('/topics', (req, res) => {
    db.query('SELECT * FROM topics', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }

        res.json(results);
    });
});

router.get('/topics/:id', (req, res) => {
    const topic_id = req.params.id;

    db.query(`SELECT * FROM topics WHERE topic_id = ?`, [topic_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(404).json({ error: 'Topic not found' });
        }

        res.json(results[0]); // Kirim 1 objek topic
    });
});

export default router;