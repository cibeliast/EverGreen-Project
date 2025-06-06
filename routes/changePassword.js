import express from 'express';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../db/db.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const roleMap = {
  students: 'student',
  teachers: 'teacher'
};

router.get('/change-password', (req, res) => {
  const role = req.session.role;
  const folder = roleMap[role];

  if (!role || !folder) return res.redirect('/login');

  const filePath = path.join(__dirname, `../pages/${folder}/changePassword.html`);
  res.sendFile(filePath);
});

router.post('/change-password', (req, res) => {
  const { prevPassword, newPassword } = req.body;

  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = req.session.userId;
  const roleSession = req.session.role;
  const role = roleMap[roleSession];

  db.query(`SELECT password FROM ${roleSession} WHERE ${role}_id = ?`, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching user');
    }

    if (results.length === 0) {
      return res.status(400).send('User not found');
    }

    const hashedPassword = results[0].password;

    bcrypt.compare(prevPassword, hashedPassword, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).send('Previous password incorrect');
      }

      bcrypt.hash(newPassword, 10, (err, newHashedPassword) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error hashing password');
        }

        db.query(
          `UPDATE ${roleSession} SET password = ? WHERE ${role}_id = ?`,
          [newHashedPassword, userId],
          (err) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Error updating password');
            }

            res.send('Password updated!');
          }
        );
      });
    });
  });
});

export default router;
