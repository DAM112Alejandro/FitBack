const express = require('express');
const reservasController = require('../controllers/reservasController');


const { authenticate } = require('../middleware/auth');


const router = express.Router();



// Rutas para obtener la disponibilidad de una clase
router.get('/clases/:id/disponibilidad', reservasController.getDisponibilidad);
router.get('/clasesDisponibles', reservasController.clasesDisponibles);

// Rutas para Reservas 

router.get('/users/:usuarioId/reservas', reservasController.getReservasUsuario);
router.get('/', reservasController.obtenerReservas);

// Ruta para crear una nueva reserva
router.post('/', reservasController.createReserva);

// Ruta para obtener la información de una reserva
router.get('/:id', reservasController.getReserva);
router.put('/:id', reservasController.updateReserva);
router.delete('/:id', reservasController.deleteReserva);

module.exports = router;