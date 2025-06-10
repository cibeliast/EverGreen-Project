import express from 'express';
import db from '../../db/db.js';

const router = express.Router();

router.get('/topicTeacher', (req, res) => {
    db.query('SELECT * FROM topics', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }

        res.json(results);
    });
});

router.get('/topicTeacher/:id', (req, res) => {
    const topic_id = req.params.id;

    db.query(`SELECT * FROM topics WHERE topic_id = ?`, [topic_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(404).json({ error: 'Topic not found' });
        }

        res.json(results[0]); // Kirim 1 objek topic
    });
});

// DELETE /api/topicTeacher/:id
router.delete('/topicTeacher/:id', (req, res) => {
    const topic_id = req.params.id;
    console.log("Deleting topic with ID:", topic_id); // Tambahkan ini

    db.query('DELETE FROM topics WHERE topic_id = ?', [topic_id], (err, result) => {
      if (err) {
        console.error("SQL DELETE error:", err); // Tambahkan ini juga
        return res.status(500).json({ error: err.message });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Topic not found' });
      }
  
      res.json({ message: 'Topic deleted successfully' });
    });
});

// Insert Topic
router.post('/topicTeacher', (req, res) => {
    const { name, description } = req.body;
  
    if (!name) return res.status(400).json({ error: "Topic name is required" });
  
    db.query(
      'INSERT INTO topics (name, description) VALUES (?, ?)',
      [name, description || null],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
  
        res.json({ message: "Topic added successfully", topic_id: result.insertId });
      }
    );
  });
  
  

export default router;