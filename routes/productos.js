const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los productos
router.get('/', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener producto:', err);
            res.status(500).json({ message: 'Error al obtener producto' });
        } else if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    });
});

// Crear un nuevo producto
router.post('/', (req, res) => {
    const { nombre, precio, stock } = req.body;
    db.query('INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)', [nombre, precio, stock], (err) => {
        if (err) throw err;
        res.json({ message: 'Producto creado exitosamente.' });
    });
});

// Actualizar un producto
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock } = req.body;

    if (!nombre || !precio || !stock) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    db.query('UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?', [nombre, precio, stock, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar productos:', err);
            res.status(500).json({ message: 'Error al actualizar producto' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Producto no encontrado' });
        } else {
            res.json({ message: 'Producto actualizado exitosamente.' });
        }
    });
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM productos WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Producto eliminado exitosamente.' });
    });
});

module.exports = router;
