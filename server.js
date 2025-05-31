import express from 'express';
import mysql, { authPlugins } from 'mysql2';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import { devNull } from 'os';
import authRoutes from './routes/authRoutes.js'
import student from './routes/student.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//Routing
app.use('/', authRoutes);
app.use('/', student);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
