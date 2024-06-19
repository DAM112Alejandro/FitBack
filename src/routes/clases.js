const express = require('express');
const clasesController = require('../controllers/clasesController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/clases', authenticate, clasesController.createClase);
router.get('/clases', authenticate, clasesController.getClases);
router.get('/clases/:id', authenticate, clasesController.getClase);
router.put('/clases/:id', authenticate, clasesController.updateClase);
router.delete('/clases/:id', authenticate, clasesController.deleteClase);


module.exports = router;