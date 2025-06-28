import express from 'express';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../db/db.js';

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
       const checkQuery = `
        (SELECT email, username FROM students WHERE email = ? OR username = ?)
        UNION
        (SELECT email, username FROM teachers WHERE email = ? OR username = ?)
        `;

        db.query(checkQuery, [email, username, email, username], async (err, results) => {
            if (err) {
                return res.redirect('signup?error=Please enter valid data!');
            }

            if (results.length > 0) {
                const existingUser = results[0];
                if (existingUser.email === email) {
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
                        return res.redirect('signup?error=Failed saving data!')
                    }
                    return res.redirect('signup?success=User added!')
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
    const {username, password} = req.body;

    const query = `(SELECT student_id AS id, name, username, password, 'students' AS role FROM students WHERE username = ?)
    UNION
    (SELECT teacher_id AS id, name, username, password, 'teachers' AS role FROM teachers WHERE username = ?) LIMIT 1`;
    db.query(query, [username, username], async (err, results) => {
        if (err) {
            console.error(err);
            return res.redirect('login?error=Database error!')
        } 
        if (results.length === 0) {
            return res.redirect('login?error=User not found!');
        }
 
        const user = results[0];
const match = await bcrypt.compare(password, user.password);
if (!match) {
   return res.redirect('login?error=Invalid password!');
}

req.session.userId = user.id; // GANTI INI
req.session.username = user.username;
req.session.role = user.role;
req.session.folderRole = user.role.slice(0, -1); // "students" jadi "student"

console.log("Session setelah login:", req.session);
return res.redirect('/dashboard');

    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('login?error=Failed to logout!');
        }
        res.redirect('/login');
    });
});

export default router;