import express from 'express';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../db.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route ke Dashboard 
router.get('/dashboard/:role', (req, res) => {
    if(!req.session.userId) {
        return res.redirect('/login');
    }

    const role = req.params.role;
    const allowedRoles = ['students', 'teachers'];

    const folderRole = req.params.role;
    const allowedFolders = ['student', 'teacher'];
    if (!allowedFolders.includes(folderRole)) {
        return res.status(404).send('Page not found');
    }
     
    res.sendFile(path.join(__dirname, '..', 'pages', role, 'dashboard.html'));
});

router.get('/dashboard', (req, res) => {
    if(!req.session.userId) {
        return res.redirect('/login');
    }
    res.redirect(`/dashboard/${req.session.folderRole}`);
})

export default router;