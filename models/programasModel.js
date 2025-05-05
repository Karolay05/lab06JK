// models/programasModel.js
const db = require('../db'); // Conexión a la base de datos

const getProgramas = (callback) => {
    const query = 'SELECT * FROM programas';
    db.query(query, callback);
};

const createPrograma = (nombre, callback) => {
    const query = 'INSERT INTO programas (nombre) VALUES (?)';
    db.query(query, [nombre], callback);
};

const updatePrograma = (id, nombre, callback) => {
    const query = 'UPDATE programas SET nombre = ? WHERE id = ?';
    db.query(query, [nombre, id], callback);
};

const deletePrograma = (id, callback) => {
    const query = 'DELETE FROM programas WHERE id = ?';
    db.query(query, [id], callback);
};

module.exports = {
    getProgramas,
    createPrograma,
    updatePrograma,
    deletePrograma
};
