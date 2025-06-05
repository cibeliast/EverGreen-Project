import express from 'express';
import db from '../../db.js';
const router = express.Router();

router.get('/profile', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Unauthorized'});
    }

    const userId = req.session.userId;
    const role = req.session.role;

    let idColumn;
    if (role === 'students') {
        idColumn = 'student_id';
    } else if (role === 'teachers') {
        idColumn = 'teacher_id';
    } else {
        return res.status(400).json({ error: 'Invalid Role'});
    }

    const query = `SELECT * FROM ${role} WHERE ${idColumn} = ?`;
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error'});
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found'});
        }
        res.json(results[0]);
    });
});

router.post('/profile/update', (req, res) => {
    if(!req.session.userId) {
        return res.status(401).json({ error: 'Unauthorized'});
    }

    const userId = req.session.userId;
    const role = req.session.role;
    const {name, username, email, address, phone_number} = req.body;

    let idColumn;
    if (role === 'students') {
        idColumn = 'student_id';
    } else if (role === 'teachers') {
        idColumn = 'teacher_id';
    } else {
        return res.status(400).json({ error: 'Invalid Role'});
    }

    const query = `UPDATE ${role} SET name=?, username=?, email=?, address=?, phone number=? WHERE ${idColumn}=?`;
    db.query(query, [name, username, email, address, phone_number, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error'});
        }
        res.json({success: true});
    });
});

export default router;