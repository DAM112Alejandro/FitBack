const mongoose = require('mongoose');

const tipoUserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
  
  });
  
  const tipoUser = mongoose.model('tipoUser', tipoUserSchema);
  
  module.exports = tipoUser;