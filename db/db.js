// POOL CONNECTION
import mysql from 'mysql2';

const db = mysql.createPool({
    host: 'maglev.proxy.rlwy.net',
    user: 'root',
    password: 'YxCIPIxdOkzlxNlyEQtJfUgiYNGcsZKt',
    database: 'railway',
    port: 11975, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default db;

// CREATE CONNECTION
// import mysql from 'mysql2';

// const db = mysql.createConnection({
//     // host: 'localhost',
//     // user: 'root',
//     // password: '',
//     // database: 'rpl_kk'
//     host: 'maglev.proxy.rlwy.net',
//     user: 'root',
//     password: 'YxCIPIxdOkzlxNlyEQtJfUgiYNGcsZKt',
//     database: 'railway',
//     port: '11975'
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Failed connect to MySQL: ', err);
//         return;
//     }
//     console.log('Connected to MySQL');
// });

// export default db;
