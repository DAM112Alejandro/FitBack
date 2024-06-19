const express = require('express');
const reservasRoutes = require('./reservas');
const userRoutes = require('./userRoutes');
const tipoUserRoutes = require('./tipoUserRoutes');
const tipoSubRoutes = require('./tipoSubRoutes');
const clasesRoutes = require('./clases');
const tipoClaseRoutes = require('./tipoClaseRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/clases', clasesRoutes);
router.use('/reserva', reservasRoutes);
router.use('/tipoUser', tipoUserRoutes);
router.use('/tipoSub', tipoSubRoutes);
router.use('/tipoClase',tipoClaseRoutes);


module.exports = router;