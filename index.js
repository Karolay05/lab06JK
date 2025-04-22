const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lab06'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos.');
});

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rutas para CRUD de productos
app.use('/productos', require('./routes/productos.js'));

// Rutas para CRUD de clientes
app.use('/clientes', require('./routes/clientes.js'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
