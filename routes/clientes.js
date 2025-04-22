const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar clientes por nombre y email
router.get('/listar', (req, res) => {
    db.query('SELECT nombre, email FROM cliente', (err, results) => {
        if (err) {
            console.error('Error al listar clientes:', err);
            res.status(500).json({ message: 'Error al listar clientes' });
        } else {
            res.json(results);
        }
    });
});

// Listar clientes mayores de 30 años
router.get('/mayores30', (req, res) => {
    db.query('SELECT nombre, email FROM cliente WHERE edad > 30', (err, results) => {
        if (err) {
            console.error('Error al listar clientes mayores de 30 años:', err);
            res.status(500).json({ message: 'Error al listar clientes mayores de 30 años' });
        } else {
            res.json(results);
        }
    });
});

// Editar la ciudad de un cliente
router.put('/editar-ciudad/:id', (req, res) => {
    const { id } = req.params;
    const { ciudad } = req.body;
    db.query('UPDATE cliente SET ciudad = ? WHERE id = ?', [ciudad, id], (err) => {
        if (err) {
            console.error('Error al actualizar la ciudad del cliente:', err);
            res.status(500).json({ message: 'Error al actualizar la ciudad del cliente' });
        } else {
            res.json({ message: 'Ciudad del cliente actualizada exitosamente.' });
        }
    });
});

// Editar la ciudad de todos los clientes en una ciudad específica
router.put('/editar-ciudad-todos', (req, res) => {
    const { ciudadActual, nuevaCiudad } = req.body;
    db.query('UPDATE cliente SET ciudad = ? WHERE ciudad = ?', [nuevaCiudad, ciudadActual], (err, results) => {
        if (err) {
            console.error('Error al actualizar ciudades:', err);
            res.status(500).json({ message: 'Error al actualizar ciudades' });
        } else {
            res.json({ message: `${results.affectedRows} clientes actualizados exitosamente.` });
        }
    });
});

// Eliminar un cliente por su nombre
router.delete('/eliminar-por-nombre', (req, res) => {
    const { nombre } = req.body;
    db.query('DELETE FROM cliente WHERE nombre = ?', [nombre], (err, results) => {
        if (err) {
            console.error('Error al eliminar cliente por nombre:', err);
            res.status(500).json({ message: 'Error al eliminar cliente por nombre' });
        } else {
            res.json({ message: `${results.affectedRows} cliente(s) eliminado(s) exitosamente.` });
        }
    });
});

// Eliminar todos los clientes que pertenezcan a una misma ciudad
router.delete('/eliminar-por-ciudad', (req, res) => {
    const { ciudad } = req.body;
    db.query('DELETE FROM cliente WHERE ciudad = ?', [ciudad], (err, results) => {
        if (err) {
            console.error('Error al eliminar clientes por ciudad:', err);
            res.status(500).json({ message: 'Error al eliminar clientes por ciudad' });
        } else {
            res.json({ message: `${results.affectedRows} cliente(s) eliminado(s) exitosamente.` });
        }
    });
});

// Obtener un cliente por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM cliente WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener cliente:', err);
            res.status(500).json({ message: 'Error al obtener cliente' });
        } else if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    });
});

// Obtener todos los clientes
router.get('/', (req, res) => {
    db.query('SELECT * FROM cliente', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Crear un nuevo cliente
router.post('/', (req, res) => {
    const { nombre, apellido, edad, email, ciudad } = req.body;
    db.query('INSERT INTO cliente (nombre, apellido, edad, email, ciudad) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, edad, email, ciudad], (err) => {
        if (err) throw err;
        res.json({ message: 'Cliente creado exitosamente.' });
    });
});

// Actualizar un cliente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, edad, email, ciudad } = req.body;

    if (!id || !nombre || !apellido || !edad || !email || !ciudad) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    db.query(
        'UPDATE cliente SET nombre = ?, apellido = ?, edad = ?, email = ?, ciudad = ? WHERE id = ?',
        [nombre, apellido, edad, email, ciudad, id],
        (err, results) => {
            if (err) {
                console.error('Error al actualizar cliente:', err);
                return res.status(500).json({ message: 'Error al actualizar cliente.' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Cliente no encontrado.' });
            }

            res.json({ message: 'Cliente actualizado exitosamente.' });
        }
    );
});

// Eliminar un cliente
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM cliente WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Cliente eliminado exitosamente.' });
    });
});

module.exports = router;
