const crearRutas = require('./crudRoutes');
const controlador = require('../controllers/productoraController');

module.exports = crearRutas(controlador);