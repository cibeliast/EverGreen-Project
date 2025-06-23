import bcrypt from 'bcrypt';
import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../../db/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

const router = express.Router();

router.get('/reset-password', (req, res) => {
  const { token } = req.query;
  
  console.log('--- GET /reset-password ---');
  console.log('Received token:', token);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  // Cek apakah token ada dan formatnya aman
  if (!token || token.split('.').length !== 3) {
    return res.status(400).send('Invalid token format.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    const filePath = path.join(__dirname, '..', '..', 'pages', 'forgot-password', 'reset-password.html');
    console.log('Serving reset-password from:', filePath);
    res.sendFile(filePath);
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    res.status(400).send('Invalid or expired token.');
  }
});


router.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body;

    console.log('--- POST /reset-password ---');
  console.log('Received token:', token);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, role } = decoded;
    console.log('Role: ', role);

    // Safety check untuk pastikan role valid
    const allowedRoles = ['students', 'teachers'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    db.query(`UPDATE ${role} SET password = ? WHERE email = ?`, [hashedPassword, email], (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.send('Password updated successfully.');
    });
  } catch (err) {
    return res.status(400).send('Invalid or expired token.');
  }
});

export default router;
