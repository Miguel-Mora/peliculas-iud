const mongoose = require('mongoose');

// Definimos la estructura de los géneros
const GeneroSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre del género es obligatorio'],
            trim: true
        },

        estado: {
            type: String,
            enum: ['Activo', 'Inactivo'],
            default: 'Activo'
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

// Exportamos el modelo para utilizarlo en la API
module.exports = mongoose.model('Genero', GeneroSchema);