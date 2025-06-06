import express from 'express';
import mysql, { authPlugins } from 'mysql2';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import { devNull } from 'os';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js'
import dashboard from './routes/dashboard.js'
import profileRouter from './routes/api/profile.js';
import studentSchedule from './routes/student/studentSchedule.js';
import students from './routes/teacher/students.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60}
}));

//Routing
app.use('/', authRoutes);
app.use('/', dashboard);
app.use('/api', profileRouter);
app.use('/api', studentSchedule);
app.use('/teacher', students);

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/student/profile.html'));
});

// Sidebar guru ke
app.get('/teacher/students', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/teacher/students.html'));
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
