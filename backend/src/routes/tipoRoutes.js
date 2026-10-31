const crearRutas = require('./crudRoutes');
const controlador = require('../controllers/tipoController');

module.exports = crearRutas(controlador);