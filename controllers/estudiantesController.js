// controllers/estudiantesController.js
const estudiantesModel = require('../models/estudiantesModel');

const getEstudiantes = (req, res) => {
    estudiantesModel.getEstudiantes((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

const createEstudiante = (req, res) => {
    const { nombre, edad, programa_id } = req.body;
    const imagen = req.file ? '/uploads/' + req.file.filename : null;

    estudiantesModel.createEstudiante(nombre, edad, programa_id, imagen, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Estudiante creado exitosamente', id: results.insertId });
    });
};

const updateEstudiante = (req, res) => {
    const { id } = req.params;
    const { nombre, edad, programa_id } = req.body;
    const imagen = req.file ? '/uploads/' + req.file.filename : null;

    estudiantesModel.updateEstudiante(id, nombre, edad, programa_id, imagen, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Estudiante actualizado exitosamente' });
    });
};

const deleteEstudiante = (req, res) => {
    const { id } = req.params;

    estudiantesModel.deleteEstudiante(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Estudiante eliminado exitosamente' });
    });
};

module.exports = {
    getEstudiantes,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante
};
