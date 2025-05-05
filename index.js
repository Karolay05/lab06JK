
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'mysql.railway.internal',
    user: 'root',
    password: 'VpUYCsQNLIeKhBGcfElkLiHaaRKpuXnf',
    database: 'railway'  // Asegúrate de que el nombre de la base de datos sea correcto
});

// Conectar a la base de datos MySQL
db.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos.');
});

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));  // Carpeta pública para archivos estáticos (HTML, CSS, JS)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Carpeta pública para imágenes subidas

// Rutas para el CRUD de estudiantes y programas
app.use('/api/estudiantes', require('./routes/estudiantes'));
app.use('/api/programas', require('./routes/programas'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
