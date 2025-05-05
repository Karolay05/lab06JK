const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'evaluacion02'
});

// Obtener todos los programas
router.get('/', (req, res) => {
    db.query('SELECT * FROM programas', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Agregar programa
router.post('/', (req, res) => {
    const { nombre } = req.body;
    db.query('INSERT INTO programas (nombre) VALUES (?)', [nombre], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Programa agregado', id: result.insertId });
    });
});

// Obtener un programa por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM programas WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Programa no encontrado' });
        res.json(results[0]);
    });
});

// Editar programa
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    db.query('UPDATE programas SET nombre = ? WHERE id = ?', [nombre, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Programa no encontrado' });
        res.json({ message: 'Programa actualizado' });
    });
});

// Eliminar programa
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM programas WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Programa eliminado' });
    });
});

module.exports = router;
