import express from 'express';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../db.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route ke Dashboard 
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'student', 'dashboard.html'));
});

export default router;