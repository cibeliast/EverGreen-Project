import express from 'express';
import db from '../../db/db.js'; 
const router = express.Router();

// Get all quizzes
// Get all quizzes with optional topic filter
router.get('/quizTeacher', (req, res) => {
    
    const topicId = req.query.topic_id; // Get topic_id from query parameters
    let query = 'SELECT * FROM quizzes';
    const params = [];

    if (topicId) {
        query += ' WHERE topic_id = ?'; // Assuming you have a 'topic_id' column in your quizzes table
        params.push(topicId);
    }

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


// Add a new quiz
router.post('/quizTeacher', (req, res) => {
    console.log('Session sekarang:', req.session); 
    const { quizLink, resultLink, topicId } = req.body;
    const teacherId = req.session.userId;

    console.log("teacherId:", teacherId);
  
    if (!quizLink || !resultLink || !topicId || !teacherId) {
      return res.status(400).json({ error: 'Data tidak lengkap!' });
    }
  
    const query = `
      INSERT INTO quizzes (quiz_link, result_link, topic_id, teacher_id)
      VALUES (?, ?, ?, ?)
    `;
  
    db.query(query, [quizLink, resultLink, topicId, teacherId], (err, result) => {
      if (err) {
        console.error('DB Error:', err);
        return res.status(500).json({ error: 'Gagal menyimpan ke database.' });
      }
  
      res.json({ success: true, message: 'Quiz berhasil ditambahkan.' });
    });
  });
  

// Update a quiz
router.put('/quizTeacher/:id', (req, res) => {
    const { id } = req.params;
    const { quizLink, resultLink } = req.body;
    db.query('UPDATE quizzes SET quiz_link = ?, result_link = ? WHERE id = ?', [quizLink, resultLink, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Quiz updated successfully' });
    });
});

// Delete a quiz
router.delete('/quizTeacher/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM quizzes WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Quiz deleted successfully' });
    });
});

export default router;
