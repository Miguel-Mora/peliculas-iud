// Importamos las dependencias
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importamos la conexión a MongoDB
const conectarDB = require('./config/db');

// Creamos la aplicación
const app = express();

// Configuramos los middlewares
app.use(cors());
app.use(express.json());

// Puerto del servidor
const PORT = process.env.PORT || 4000;

// Ruta principal
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'API REST de películas funcionando correctamente',
        baseDatos: 'MongoDB Atlas'
    });
});

// Iniciamos la aplicación después de conectar la base de datos
const iniciarServidor = async () => {
    try {
        await conectarDB();

        app.listen(PORT, () => {
            console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo iniciar el servidor:', error.message);
        process.exit(1);
    }
};

iniciarServidor();