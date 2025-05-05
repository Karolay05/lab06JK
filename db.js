const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'evaluacion02'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos.');
});

module.exports = db;
