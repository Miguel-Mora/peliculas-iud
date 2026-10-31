const mongoose = require('mongoose');

const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

// Verificar las referencias de la película
const validarReferencias = async (datos) => {
    const referencias = [
        { campo: 'genero', Modelo: Genero, activo: true },
        { campo: 'director', Modelo: Director, activo: true },
        { campo: 'productora', Modelo: Productora, activo: true },
        { campo: 'tipo', Modelo: Tipo, activo: false }
    ];

    for (const referencia of referencias) {
        const id = datos[referencia.campo];

        if (!id || !mongoose.isValidObjectId(id)) {
            return `${referencia.campo}: identificador inválido`;
        }

        const filtro = { _id: id };

        if (referencia.activo) {
            filtro.estado = 'Activo';
        }

        const registro = await referencia.Modelo.findOne(filtro);

        if (!registro) {
            return `${referencia.campo}: no existe o está inactivo`;
        }
    }

    return null;
};

const manejarError = (res, error) => {
    if (error.code === 11000) {
        return res.status(409).json({
            mensaje: 'El serial o la URL ya se encuentra registrado'
        });
    }

    if (error.name === 'ValidationError' ||
        error.name === 'CastError') {
        return res.status(400).json({
            mensaje: error.message
        });
    }

    return res.status(500).json({
        mensaje: 'Error interno del servidor'
    });
};

// GET: consultar películas y series
exports.listar = async (req, res) => {
    try {
        const registros = await Media.find()
            .populate('genero', 'nombre estado')
            .populate('director', 'nombres estado')
            .populate('productora', 'nombre estado')
            .populate('tipo', 'nombre');

        res.status(200).json(registros);
    } catch (error) {
        manejarError(res, error);
    }
};

// GET: consultar una película por ID
exports.obtener = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ mensaje: 'ID inválido' });
        }

        const registro = await Media.findById(req.params.id)
            .populate('genero')
            .populate('director')
            .populate('productora')
            .populate('tipo');

        if (!registro) {
            return res.status(404).json({
                mensaje: 'Película o serie no encontrada'
            });
        }

        res.status(200).json(registro);
    } catch (error) {
        manejarError(res, error);
    }
};

// POST: crear película o serie
exports.crear = async (req, res) => {
    try {
        const errorReferencia = await validarReferencias(req.body);

        if (errorReferencia) {
            return res.status(400).json({
                mensaje: errorReferencia
            });
        }

        const registro = new Media(req.body);
        await registro.save();

        res.status(201).json(registro);
    } catch (error) {
        manejarError(res, error);
    }
};

// PUT: actualizar película o serie
exports.actualizar = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ mensaje: 'ID inválido' });
        }

        const registro = await Media.findById(req.params.id);

        if (!registro) {
            return res.status(404).json({
                mensaje: 'Película o serie no encontrada'
            });
        }

        const datosActualizados = {
            ...registro.toObject(),
            ...req.body
        };

        const errorReferencia = await validarReferencias(datosActualizados);

        if (errorReferencia) {
            return res.status(400).json({
                mensaje: errorReferencia
            });
        }

        const actualizado = await Media.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json(actualizado);
    } catch (error) {
        manejarError(res, error);
    }
};

// DELETE: eliminar película o serie
exports.eliminar = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ mensaje: 'ID inválido' });
        }

        const registro = await Media.findByIdAndDelete(req.params.id);

        if (!registro) {
            return res.status(404).json({
                mensaje: 'Película o serie no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Película o serie eliminada correctamente'
        });
    } catch (error) {
        manejarError(res, error);
    }
};