const express = require('express');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const tipoClaseController = require('../controllers/tipoClaseController');

const router = express.Router();

router.post('/', authenticate, authorizeAdmin, tipoClaseController.addTipoClase);

router.get('/', authenticate, tipoClaseController.getTipoClases);

router.get('/:id', authenticate, tipoClaseController.getTipoClaseById);

router.put('/:id', authenticate, authorizeAdmin, tipoClaseController.updateTipoClase);

router.delete('/:id', authenticate, authorizeAdmin, tipoClaseController.deleteTipoClase);

module.exports = router;
