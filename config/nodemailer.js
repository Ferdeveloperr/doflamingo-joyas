import nodemailer from 'nodemailer';

// Configuración para Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,  // Tu dirección de correo electrónico de Gmail
    pass: process.env.GMAIL_PASS   // Tu contraseña de Gmail o una contraseña de aplicación
  }
});

export default transporter;
