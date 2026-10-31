const express = require('express');
const cors = require('cors');
require('dotenv').config();

const conectarDB = require('./config/db');

const generoRoutes = require('./routes/generoRoutes');
const directorRoutes = require('./routes/directorRoutes');
const productoraRoutes = require('./routes/productoraRoutes');
const tipoRoutes = require('./routes/tipoRoutes');
const mediaRoutes = require('./routes/mediaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Ruta principal
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'API REST de películas funcionando correctamente',
        baseDatos: 'MongoDB Atlas'
    });
});

// Rutas de los módulos
app.use('/api/generos', generoRoutes);
app.use('/api/directores', directorRoutes);
app.use('/api/productoras', productoraRoutes);
app.use('/api/tipos', tipoRoutes);
app.use('/api/medias', mediaRoutes);

// Inicialización del servidor
const iniciarServidor = async () => {
    try {
        await conectarDB();

        app.listen(PORT, () => {
            console.log(
                `🚀 Servidor ejecutándose en http://localhost:${PORT}`
            );
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

iniciarServidor();