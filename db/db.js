import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rpl'
});

db.connect((err) => {
    if (err) {
        console.error('Failed connect to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL');
});

export default db;