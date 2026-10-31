const mongoose = require('mongoose');

const crearControlador = (Modelo) => ({

    listar: async (req, res) => {
        try {
            const registros = await Modelo.find();
            res.status(200).json(registros);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    },

    obtener: async (req, res) => {
        try {
            if (!mongoose.isValidObjectId(req.params.id)) {
                return res.status(400).json({ mensaje: 'ID inválido' });
            }

            const registro = await Modelo.findById(req.params.id);

            if (!registro) {
                return res.status(404).json({
                    mensaje: 'Registro no encontrado'
                });
            }

            res.status(200).json(registro);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    },

    crear: async (req, res) => {
        try {
            const registro = new Modelo(req.body);
            await registro.save();

            res.status(201).json(registro);
        } catch (error) {
            if (error.name === 'ValidationError' ||
                error.name === 'CastError') {
                return res.status(400).json({
                    mensaje: error.message
                });
            }

            if (error.code === 11000) {
                return res.status(409).json({
                    mensaje: 'Registro duplicado'
                });
            }

            res.status(500).json({ mensaje: error.message });
        }
    },

    actualizar: async (req, res) => {
        try {
            if (!mongoose.isValidObjectId(req.params.id)) {
                return res.status(400).json({ mensaje: 'ID inválido' });
            }

            const registro = await Modelo.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!registro) {
                return res.status(404).json({
                    mensaje: 'Registro no encontrado'
                });
            }

            res.status(200).json(registro);
        } catch (error) {
            if (error.name === 'ValidationError' ||
                error.name === 'CastError') {
                return res.status(400).json({
                    mensaje: error.message
                });
            }

            if (error.code === 11000) {
                return res.status(409).json({
                    mensaje: 'Registro duplicado'
                });
            }

            res.status(500).json({ mensaje: error.message });
        }
    },

    eliminar: async (req, res) => {
        try {
            if (!mongoose.isValidObjectId(req.params.id)) {
                return res.status(400).json({ mensaje: 'ID inválido' });
            }

            const registro = await Modelo.findByIdAndDelete(req.params.id);

            if (!registro) {
                return res.status(404).json({
                    mensaje: 'Registro no encontrado'
                });
            }

            res.status(200).json({
                mensaje: 'Registro eliminado correctamente'
            });
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }
});

module.exports = crearControlador;
