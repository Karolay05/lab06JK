// models/estudiantesModel.js
const db = require('../db'); // Este sería tu archivo donde tienes la conexión a la base de datos

const getEstudiantes = (callback) => {
    const query = 'SELECT * FROM estudiantes';
    db.query(query, callback);
};

const createEstudiante = (nombre, edad, programa_id, imagen, callback) => {
    const query = 'INSERT INTO estudiantes (nombre, edad, programa_id, imagen) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, edad, programa_id, imagen], callback);
};

const updateEstudiante = (id, nombre, edad, programa_id, imagen, callback) => {
    const query = 'UPDATE estudiantes SET nombre = ?, edad = ?, programa_id = ?, imagen = ? WHERE id = ?';
    db.query(query, [nombre, edad, programa_id, imagen, id], callback);
};

const deleteEstudiante = (id, callback) => {
    const query = 'DELETE FROM estudiantes WHERE id = ?';
    db.query(query, [id], callback);
};

module.exports = {
    getEstudiantes,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante
};
