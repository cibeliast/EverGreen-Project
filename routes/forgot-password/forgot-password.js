import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import db from '../../db/db.js';

dotenv.config();

const router = express.Router();

router.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  db.query(`(SELECT email, 'students' AS role FROM students WHERE email = ?)
  UNION
  (SELECT email, 'teachers' AS role FROM teachers WHERE email = ?)`, [email, email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const role = results[0].role;
    const token = jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    console.log('Generated token:', token);
    const resetLink = `${process.env.BASE_URL}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"EverGreen" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Password',
      html: `
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <p><a href="${resetLink}">Reset your password</a></p>
        <p>If the button doesn't work, copy and paste this URL into your browser:</p>
        <p>${resetLink}</p>
        `,
    };

    console.log('EMAIL:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Present' : 'Missing');

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send email' });
      }
      res.json({ message: 'Reset email sent!' });
    });
  });
});

export default router;