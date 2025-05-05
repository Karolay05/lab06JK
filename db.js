const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'mysql.railway.internal',
    user: 'root',
    password: 'VpUYCsQNLIeKhBGcfElkLiHaaRKpuXnf',
    database: 'railway'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos.');
});

module.exports = db;
