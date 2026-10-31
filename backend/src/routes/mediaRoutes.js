const express = require('express');
const router = express.Router();

const mediaController = require('../controllers/mediaController');

router.get('/', mediaController.listar);
router.get('/:id', mediaController.obtener);
router.post('/', mediaController.crear);
router.put('/:id', mediaController.actualizar);
router.delete('/:id', mediaController.eliminar);

module.exports = router;