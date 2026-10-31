const crearRutas = require('./crudRoutes');
const controlador = require('../controllers/directorController');

module.exports = crearRutas(controlador);