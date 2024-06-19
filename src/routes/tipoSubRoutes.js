const express = require('express');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const tipoSubController = require('../controllers/tipoSubController');

const router = express.Router();

router.post('/', authenticate, authorizeAdmin, tipoSubController.addTipoSub);

router.get('/', authenticate, authorizeAdmin, tipoSubController.getTipoSubs);

router.get('/:id', authenticate, authorizeAdmin, tipoSubController.getTipoSubById);

router.put('/:id', authenticate, authorizeAdmin, tipoSubController.updateTipoSub);

router.delete('/:id', authenticate, authorizeAdmin, tipoSubController.deleteTipoSub);

module.exports = router;

