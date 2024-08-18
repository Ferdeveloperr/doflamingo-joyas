import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configuración para Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,  // Tu dirección de correo electrónico de Gmail
    pass: process.env.GMAIL_PASS   // Tu contraseña de Gmail o una contraseña de aplicación
  }

});

export default transporter;
