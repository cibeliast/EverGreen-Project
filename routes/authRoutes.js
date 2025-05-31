import express from 'express';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../db.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route ke signup 
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'auth', 'signup.html'));
});

// Route POST signup
router.post('/signup', async (req, res) => {
    const {email, username, role, password} = req.body;

    try {
        const checkQuery = `SELECT * FROM ${role} WHERE email = ? OR username = ?`;
        db.query(checkQuery, [email, username], async (err, results) => {
            if (err) {
                // console.error('Error checking existing user: ', err);
                // return res.status(500).send('Error checking existing user');
                return res.redirect('signup?error=Please enter valid data!');
            }

            if (results.length > 0) {
                const existingUser = results[0];
                if (existingUser.email === email) {
                    // return res.status(400).send('E-mail already used!');
                    return res.redirect('signup?error=Email already used!');
                } else if (existingUser.username === username) {
                    return res.redirect('signup?error=Username already used!');
                }
            }

            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const query = `INSERT INTO ${role} (email, username, password) VALUES (?, ?, ?)`;

                db.query(query, [email, username, hashedPassword], (err, results) => {
                    if (err) {
                        console.error('Error inserting data: ', err);
                        res.status(500).send('Failed saving data');
                        return;
                    }
                    res.send('User added!');
                });
            } catch (hashError) {
                console.error('Hash error: ', hashError);
                res.status(500).send('Error processing password');
            }
        });
    } catch (error) {
        console.error('Sign Up error:', error);
        res.status(500).send('Error server');
    }
});
   

// GET login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'auth', 'login.html'));
});

// Route POST login
router.post ('/login', (req, res) => {
    const {username, password, role} = req.body;

    const query = `SELECT * FROM ${role} WHERE username = ?`;
    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        } 
        if (results.length === 0) {
            return res.redirect('login?error=User not found!');
        }
 
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
           return res.redirect('login?error=Invalid password!');
        }
        return res.redirect('/dashboard');
    });
});

export default router;