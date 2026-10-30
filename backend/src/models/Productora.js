const mongoose = require('mongoose');

// Definimos la estructura de las productoras
const ProductoraSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre de la productora es obligatorio'],
            trim: true
        },

        estado: {
            type: String,
            enum: ['Activo', 'Inactivo'],
            default: 'Activo'
        },

        slogan: {
            type: String,
            default: '',
            trim: true
        },

        descripcion: {
            type: String,
            default: '',
            trim: true
        }
    },
    {
        timestamps: true
    }
);

// Exportamos el modelo
module.exports = mongoose.model('Productora', ProductoraSchema);