const express = require('express');
const router = express.Router();
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');

// Conexión directa (o usa la exportación de tu `index.js`)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'evaluacion02'
});

// Configurar almacenamiento con Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// Obtener todos los estudiantes
router.get('/', (req, res) => {
    db.query('SELECT * FROM estudiantes', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Agregar estudiante
router.post('/', upload.single('imagen'), (req, res) => {
    const { nombre, correo, telefono, programa_id } = req.body;
    const imagen = req.file ? req.file.filename : null;
    db.query(
        'INSERT INTO estudiantes (nombre, correo, telefono, programa_id, imagen) VALUES (?, ?, ?, ?, ?)',
        [nombre, correo, telefono, programa_id, imagen],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Estudiante agregado', id: result.insertId });
        }
    );
});


// Obtener un estudiante por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM estudiantes WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0) return res.status(404).json({ error: 'Estudiante no encontrado' });
      res.json(result[0]);
    });
  });
  

// Actualizar un estudiante
router.put('/:id', upload.single('imagen'), (req, res) => {
    const { id } = req.params;
    const { nombre, correo, telefono, programa_id } = req.body;
    let sql = 'UPDATE estudiantes SET nombre = ?, correo = ?, telefono = ?, programa_id = ?';
    const params = [nombre, correo, telefono, programa_id];
  
    if (req.file) {
      sql += ', imagen = ?';
      params.push(req.file.filename);
    }
  
    sql += ' WHERE id = ?';
    params.push(id);
  
    db.query(sql, params, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: 'Estudiante actualizado correctamente' });
    });
  });
  

// Eliminar estudiante
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM estudiantes WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Estudiante eliminado' });
    });
});

module.exports = router;
