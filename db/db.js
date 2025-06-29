import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'maglev.proxy.rlwy.net',
    user: 'root',
    password: 'YxCIPIxdOkzlxNlyEQtJfUgiYNGcsZKt',
    database: 'railway',
    port: '11975'
});

db.connect((err) => {
    if (err) {
        console.error('Failed connect to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL');
});

export default db;