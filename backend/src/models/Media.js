const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema(
    {
        serial: {
            type: String,
            required: [true, 'El serial es obligatorio'],
            unique: true,
            trim: true
        },

        titulo: {
            type: String,
            required: [true, 'El título es obligatorio'],
            trim: true
        },

        sinopsis: {
            type: String,
            required: [true, 'La sinopsis es obligatoria'],
            trim: true
        },

        url: {
            type: String,
            required: [true, 'La URL es obligatoria'],
            unique: true,
            trim: true
        },

        imagen: {
            type: String,
            required: [true, 'La imagen de portada es obligatoria']
        },

        anioEstreno: {
            type: Number,
            required: [true, 'El año de estreno es obligatorio']
        },

        genero: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genero',
            required: true
        },

        director: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Director',
            required: true
        },

        productora: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Productora',
            required: true
        },

        tipo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tipo',
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Media', MediaSchema);