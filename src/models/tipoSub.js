const mongoose = require('mongoose');

const tipoSubSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true    }
  
  });
  
  const tipoSub = mongoose.model('tipoSub', tipoSubSchema);
  
  module.exports = tipoSub;