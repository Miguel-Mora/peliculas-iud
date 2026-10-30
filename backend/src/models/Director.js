const mongoose = require('mongoose');

// Definimos la estructura de los directores
const DirectorSchema = new mongoose.Schema(
    {
        nombres: {
            type: String,
            required: [true, 'El nombre del director es obligatorio'],
            trim: true
        },

        estado: {
            type: String,
            enum: ['Activo', 'Inactivo'],
            default: 'Activo'
        }
    },
    {
        timestamps: true
    }
);

// Exportamos el modelo
module.exports = mongoose.model('Director', DirectorSchema);