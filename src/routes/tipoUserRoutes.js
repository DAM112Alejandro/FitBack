const express = require('express');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const tipoUserController = require('../controllers/tipoUserController');

const router = express.Router();

router.post('/', authenticate, authorizeAdmin, tipoUserController.addTipoUser);

router.get('/', authenticate, authorizeAdmin, tipoUserController.getTipoUser);

router.get('/:id', authenticate, authorizeAdmin, tipoUserController.getTipoUserById);

router.put('/:id', authenticate, authorizeAdmin, tipoUserController.updateTipoUser);

router.delete('/:id', authenticate, authorizeAdmin, tipoUserController.deleteTipoUser);

module.exports = router;