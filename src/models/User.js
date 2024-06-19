const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fitlife.uem@gmail.com', 
    pass: 'knoa miit pydi rtoi' 
  }
});

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
  numeroCuenta: {
    type: String,
    required: true,
  },
  suscripcion: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'tipoSub',
    required: true,
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  },
  tipoUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tipoUser',
    required: true,
  },
  reservaGratuita: {
    type: Number,
    required: false,
  }
});
//   terminos: {
//     type: Boolean,
//     required: true,
//   },
//   promociones: {
//     type: Boolean,
//     required: true,
//   },
//   recordatorios: {
//     type: Boolean,
//     required: true,
//   },
//   membresia: {
//     type: String,
//     required: true,
//   },
// });


userSchema.post('save', function(doc, next) {
  let mailOptions = {
    from: 'fitlife.uem@gmail.com',
    to: doc.correo,
    subject: 'Bienvenido a FitLife',
    text: 'Gracias por registrarte, ' + doc.nombre + '! Tu suscripción es: ' + doc.suscripcion
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Correo enviado: ' + info.response);
    }
  });

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;