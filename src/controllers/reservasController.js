const Reserva = require('../models/Reserva');
const User = require('../models/User');
const Class = require('../models/Class');
const { sendReservationEmail, sendTelegramNotification, sendSms } = require('./notificationService'); // Asegúrate de que la ruta al archivo notificationService.js sea correcta




  exports.createReserva = async (req, res) => {
    try {
      const { usuarioId, claseId} = req.body;
  
      const usuario = await User.findById(usuarioId).lean();
      const clase = await Class.findById(claseId).lean();
      if (!clase) {
        return res.status(404).json({ error: 'Clase no encontrada' });
  }

      // Comprueba si la clase ya ha alcanzado su capacidad máxima
    const existingReservations = await Reserva.find({ clase: claseId }).countDocuments();
    if (existingReservations >= clase.capacidadMaxima) {
        return res.status(400).json({ error: 'La clase ya ha alcanzado su capacidad máxima' });
    }
  
      if (!usuario || !clase ) {
        return res.status(404).json({ error: 'Usuario o clase no encontrado' });
      }
  
      const reserva = new Reserva({
        usuario: usuarioId,
        clase: claseId
      });
  
      await reserva.save();
      await sendReservationEmail(usuario.email, usuario.name, clase.nombre, fecha, hora);
      await sendTelegramNotification(usuario.telegramId, reserva._id);
      await sendSms(usuarioId, usuario.name, clase.nombre, fecha, hora);
    
      res.status(201).json(reserva);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  exports.obtenerReservas = async (req, res) => {
    try {
      const reservas = await Reserva.find().populate('usuario clase');
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getReserva = async (req, res) => {
      try {
        const { id } = req.params;
        const reserva = await Reserva.findById(id);
        if (!reserva) {
          return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(200).json(reserva);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };


exports.updateReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuarioId, claseId, fecha, hora } = req.body;

    const update = {};
    if (usuarioId) update.usuarioId = usuarioId;
    if (claseId) update.claseId = claseId;
    if (fecha) update.fecha = fecha;
    if (hora) update.hora = hora;

    const reserva = await Reserva.findByIdAndUpdate(id, update, { new: true });
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  
exports.deleteReserva = async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByIdAndDelete(id);
      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }
      res.status(200).json({ message: 'Reserva eliminada', reserva });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


  exports.getDisponibilidad = async (req, res) => {
    try {
      const { id } = req.params;
  
      const clase = await Class.findById(id);
      if (!clase) {
        return res.status(404).json({ error: 'Clase no encontrada' });
      }
  
      const existingReservations = await Reserva.find({ clase: id }).countDocuments();
  
      res.json({
        capacidadMaxima: clase.capacidadMaxima,
        reservasExistentes: existingReservations,
        disponibilidad: clase.capacidadMaxima - existingReservations
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.clasesDisponibles = async (req, res) => {
    try {
        const clases = await Class.find().lean();

        //  cuenta las reservas existentes y calcula la disponibilidad por clase
        const clasesConDisponibilidad = await Promise.all(clases.map(async (clase) => {
            const reservasExistentes = await Reserva.find({ clase: clase._id }).countDocuments();
            const disponibilidad = clase.capacidadMaxima - reservasExistentes;

            
            return {
                ...clase,
                disponibilidad,
            };
        }));

        res.status(200).json(clasesConDisponibilidad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addReservaGratuita = async (req, res) => {
  try {
    const { usuarioId , claseId } = req.params;

    const usuario = await User.findById(usuarioId);
    const clase = await Class.findById(claseId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if(!clase) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }
    if (usuario.reservaGratuita>0) {
      return res.status(400).json({ error: 'El usuario ya tiene una reserva gratuita' });
    }
    const user ={
      reservaGratuita: 1
    }

    User.findByIdAndUpdate(usuarioId, user, { new: true });

    const reserva = new Reserva({
      usuario: usuarioId,
      clase: claseId
    });

    await reserva.save();
    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



exports.getReservasUsuario = async (req, res) => {
    try {
      const { usuarioId } = req.params;
  
      const usuario = await User.findById(usuarioId);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const reservas = await Reserva.find({ usuario: usuarioId})
      const clases = []

      for (let i = 0; i < reservas.length; i++) {
        const clase = await Class.findById(reservas[i].clase);
        clases.push(clase.nombre ,clase.fecha, clase.hora);
      }
  
      res.json(clases);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };