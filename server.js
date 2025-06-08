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
import changePassword from './routes/changePassword.js';
import topicsRouter from './routes/api/topics.js';
import quizzesRouter from './routes/api/quizzes.js';
import all_schedule from './routes/teacher/all_schedule.js';
import booked_schedule from './routes/teacher/booked_schedule.js';
import paymentRouter from './routes/teacher/payment.js';
import free_schedule from './routes/teacher/free_schedule.js';

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
app.use('/', changePassword);
app.use('/api', topicsRouter);
app.use('/api', quizzesRouter);
app.use('/api', all_schedule);
app.use('/api', booked_schedule);
app.use('/api', paymentRouter);
app.use('/api', free_schedule); // Ensure this is included


// Student to
app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/student/profile.html'));
});

app.get('/topic', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/student/topic.html'));
});

app.get('/quiz', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/student/quiz.html'));
});

// Sidebar guru ke 
// 1. Students
app.get('/teacher/students', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/teacher/students.html'));
});

app.get('/all_schedule', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/teacher/all_schedule.html'));
});

// All schedule button "edit schedule" to Booked schedule
app.get('/booked_schedule', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/teacher/booked_schedule.html'));
});

app.get('/free_schedule', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/teacher/free_schedule.html'));
});

app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/teacher/payment.html'));
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
