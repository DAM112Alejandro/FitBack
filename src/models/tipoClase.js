const mongoose = require('mongoose');

const tipoClaseSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
  
  });
  
  const tipoClase = mongoose.model('tipoClase', tipoClaseSchema);
  
  module.exports = tipoClase;