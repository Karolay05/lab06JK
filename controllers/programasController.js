// controllers/programasController.js
const programasModel = require('../models/programasModel');

const getProgramas = (req, res) => {
    programasModel.getProgramas((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los programas', details: err.message });
        }
        res.json(results);
    });
};

const createPrograma = (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    programasModel.createPrograma(nombre, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear el programa', details: err.message });
        }
        res.status(201).json({ message: 'Programa creado exitosamente', id: results.insertId });
    });
};

const updatePrograma = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    programasModel.updatePrograma(id, nombre, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar el programa', details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Programa no encontrado' });
        }
        res.json({ message: 'Programa actualizado exitosamente' });
    });
};

const deletePrograma = (req, res) => {
    const { id } = req.params;

    programasModel.deletePrograma(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar el programa', details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Programa no encontrado' });
        }
        res.json({ message: 'Programa eliminado exitosamente' });
    });
};

module.exports = {
    getProgramas,
    createPrograma,
    updatePrograma,
    deletePrograma
};
