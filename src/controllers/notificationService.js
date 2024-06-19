const nodemailer = require('nodemailer');
const axios = require('axios');
const twilio = require('twilio');
const User = require('../models/User');

const accountSid = 'ACf9a693834952719bee407cabe8b72081'; 
const authToken = '7fb1c5fb586933c9ccba2db7fb54dc16'; 

const client = new twilio(accountSid, authToken);

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fitlife.uem@gmail.com', 
    pass: 'knoa miit pydi rtoi' 
  }
});

function sendReservationEmail(userEmail, userName, className, reservationDate, reservationTime, message) {
    let mailOptions = {
      from: 'fitlife.uem@gmail.com',
      to: userEmail,
      subject: 'Actualización de la reserva',
      text: `Hola ${userName}, ${message} Los detalles de tu reserva eran: Clase: ${className}, Fecha: ${reservationDate}, Hora: ${reservationTime}.`
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Correo enviado: ' + info.response);
      }
    });
}

async function sendSms(userId, userName, className, reservationDate, reservationTime, message) {
    try {
      const user = await User.findById(userId);
      client.messages.create({
        body: `Hola ${userName}, ${message} Los detalles de tu reserva eran: Clase: ${className}, Fecha: ${reservationDate}, Hora: ${reservationTime}.`,
        to: user.phone,
        from: '+15513776949'
      })
      .then((message) => console.log(message.sid));
    } catch (err) {
      console.log(err);
    }
  }

  function sendTelegramNotification(telegramId, message) {
    const telegramBotToken = 'bot6991005960:AAGpVRaFf-qsdouNRVj0ca70RLjHEKb17QI';
  
    axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      chat_id: telegramId,
      text: message
    })
    .then(response => {
      console.log('Mensaje de Telegram enviado');
    })
    .catch(error => {
      console.log('Error al enviar el mensaje de Telegram: ', error);
    });
  }

module.exports = {
  sendReservationEmail,
  sendTelegramNotification,
  sendSms
};


