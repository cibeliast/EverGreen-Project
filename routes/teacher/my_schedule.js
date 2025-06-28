import express from 'express';
import db from '../../db/db.js';

const router = express.Router();

// Endpoint ambil data jadwal (day & time), nama guru, nama murid
router.get('/my_schedule', (req, res) => {
    // Validasi session
    if (!req.session.userId || req.session.folderRole !== 'teacher') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const teacherId = req.session.userId;

    const sql = `
        SELECT 
            sc.schedule_id, sc.day, sc.time, 
            tc.name AS teacher_name, 
            st.name AS student_name,
            st.student_id AS student_id
        FROM schedules sc
        JOIN teachers tc ON sc.teacher_id = tc.teacher_id
        LEFT JOIN students st ON sc.student_id = st.student_id
        WHERE sc.teacher_id = ?
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
            END,
            sc.time;
    `;

    db.query(sql, [teacherId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.json(results);
    });
});

// Endpoint untuk menambah jadwal
router.post('/my_schedule', (req, res) => {
    // Validasi session
    if (!req.session.userId || req.session.folderRole !== 'teacher') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const { day, time } = req.body; // Ambil data dari request body
    const teacherId = req.session.userId;

    const sql = `
        INSERT INTO schedules (day, time, teacher_id)
        VALUES (?, ?, ?);
    `;

    db.query(sql, [day, time, teacherId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'Schedule added successfully', scheduleId: results.insertId });
    });
});

// Tambahkan route untuk mendapatkan daftar siswa
router.get('/students', (req, res) => {
    if (!req.session.userId || req.session.folderRole !== 'teacher') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const sql = `SELECT student_id, name FROM students ORDER BY name`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.json(results);
    });
});

// Endpoint ambil data jadwal (day & time), nama guru, nama murid
router.get('/my_schedule', (req, res) => {
    if (!req.session.userId || req.session.folderRole !== 'teacher') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const teacherId = req.session.userId;

    const sql = `
        SELECT 
            sc.schedule_id, sc.day, sc.time, 
            tc.name AS teacher_name, 
            st.name AS student_name,
            st.student_id AS student_id
        FROM schedules sc
        JOIN teachers tc ON sc.teacher_id = tc.teacher_id
        LEFT JOIN students st ON sc.student_id = st.student_id
        WHERE sc.teacher_id = ?
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
            END,
            sc.time;
    `;

    db.query(sql, [teacherId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.json(results);
    });
});

// Endpoint untuk menambah jadwal
router.post('/my_schedule', (req, res) => {
    if (!req.session.userId || req.session.folderRole !== 'teacher') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const { day, time } = req.body;
    const teacherId = req.session.userId;

    const sql = `
        INSERT INTO schedules (day, time, teacher_id)
        VALUES (?, ?, ?);
    `;

    db.query(sql, [day, time, teacherId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'Schedule added successfully', scheduleId: results.insertId });
    });
});

// Endpoint update jadwal (edit)
router.put('/my_schedule/:id', (req, res) => {
    if (!req.session.userId || req.session.folderRole !== 'teacher') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const scheduleId = req.params.id;
    const { day, time, student_id } = req.body;

    const sql = `
        UPDATE schedules SET day = ?, time = ?, student_id = ?
        WHERE schedule_id = ? AND teacher_id = ?
    `;

    db.query(sql, [day, time, student_id, scheduleId, req.session.userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Schedule not found or unauthorized' });
        }

        res.status(200).json({ message: 'Schedule updated successfully' });
    });
});


export default router;