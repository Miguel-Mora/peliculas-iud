const crearRutas = require('./crudRoutes');
const controlador = require('../controllers/generoController');

module.exports = crearRutas(controlador);