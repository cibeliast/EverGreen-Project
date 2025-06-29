import express from 'express';
import mysql, { authPlugins } from 'mysql2';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import { devNull } from 'os';
import dotenv from 'dotenv';
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
import my_schedule from './routes/teacher/my_schedule.js';
import topicTeacher from './routes/teacher/topic.js';
import quizTeacher from './routes/teacher/quiz.js';
import forgotPasswordRouter from './routes/forgot-password/forgot-password.js';
import resetPasswordRouter from './routes/forgot-password/reset-password.js';
import scheduleTeacherDashboard from './routes/teacher/schedule_dashboard.js';

dotenv.config();

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
app.use('/api', free_schedule); 
app.use('/api', my_schedule);
app.use('/api', topicTeacher);
app.use('/api', quizTeacher);
app.use('/api', forgotPasswordRouter);
app.use('/', resetPasswordRouter);
app.use('/api', scheduleTeacherDashboard);


// app.get('/profile', (req, res) => {
//   res.sendFile(path.join(__dirname, 'pages/student/profile.html'));
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/auth/login.html'));
});

app.get('/profile', (req, res) => {
  if (req.session.folderRole === 'teacher') {
    res.sendFile(path.join(__dirname, 'pages/teacher/profile.html'));
  } else if (req.session.folderRole === 'student') {
    res.sendFile(path.join(__dirname, 'pages/student/profile.html'));
  } else {
    res.redirect('/'); // redirect ke login atau halaman lain kalau belum login
  }
});

app.get('/forgot-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/forgot-password/forgot-password.html'));
});

app.get('/check-email', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/forgot-password/check-email.html'));
});

app.get('/success-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/forgot-password/success-password.html'));
});

// Student to
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

// 2. Schedule
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

app.get('/my_schedule', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/teacher/my_schedule.html'));
});

// 3. Topic
app.get('/topicTeacher', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/teacher/topic.html'));
});

app.get('/quizTeacher', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/teacher/quiz.html'));
});

// 4. Payments
app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/teacher/payment.html'));
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
