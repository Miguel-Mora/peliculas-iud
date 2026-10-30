const mongoose = require('mongoose');

const TipoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre del tipo es obligatorio'],
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

module.exports = mongoose.model('Tipo', TipoSchema);