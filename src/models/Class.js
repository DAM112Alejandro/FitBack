const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tipoClase',
    required: true,
  },
  horario: {
    type: String,
    required: true,
  },
  dia: {
    type: String,
    required: true,
  },
  capacidadMaxima: {
    type: Number,
    required: true,
  },
});


const Class = mongoose.model('Class', classSchema);

module.exports = Class;