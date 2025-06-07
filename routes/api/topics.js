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

export default router;