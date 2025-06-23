import express from 'express';
import db from '../../db/db.js';

const router = express.Router();

// ✅ GET: Ambil semua quiz (bisa difilter dengan topic_id)
router.get('/quizTeacher', (req, res) => {
  const topicId = req.query.topic_id;
  let query = 'SELECT * FROM quizzes';
  const params = [];

  if (topicId) {
    query += ' WHERE topic_id = ?';
    params.push(topicId);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ POST: Tambah quiz baru
router.post('/quizTeacher', (req, res) => {
  const { quizLink, resultLink, topicId } = req.body;
  const teacherId = req.session.userId;

  if (!quizLink || !resultLink || !topicId || !teacherId) {
    return res.status(400).json({ error: 'Data tidak lengkap!' });
  }

  const query = `
    INSERT INTO quizzes (quiz_link, result_link, topic_id, teacher_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [quizLink, resultLink, topicId, teacherId], (err) => {
    if (err) return res.status(500).json({ error: 'Gagal menyimpan ke database.' });
    res.json({ success: true, message: 'Quiz berhasil ditambahkan.' });
  });
});

// ✅ GET: Ambil 1 quiz by quiz_id
router.get('/quizTeacher/:quiz_id', (req, res) => {
  const { quiz_id } = req.params;
  const query = 'SELECT * FROM quizzes WHERE quiz_id = ?';

  db.query(query, [quiz_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Quiz tidak ditemukan' });
    res.json(results[0]);
  });
});

// ✅ PUT: Edit quiz by quiz_id
router.put('/quizTeacher/:quiz_id', (req, res) => {
  const { quiz_id } = req.params;
  const { quizLink, resultLink } = req.body;

  const query = 'UPDATE quizzes SET quiz_link = ?, result_link = ? WHERE quiz_id = ?';
  db.query(query, [quizLink, resultLink, quiz_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: 'Quiz berhasil diupdate.' });
  });
});

// ✅ DELETE: Hapus quiz by quiz_id
router.delete('/quizTeacher/:quiz_id', (req, res) => {
  const { quiz_id } = req.params;
  const query = 'DELETE FROM quizzes WHERE quiz_id = ?';

  db.query(query, [quiz_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: 'Quiz berhasil dihapus.' });
  });
});

export default router;
