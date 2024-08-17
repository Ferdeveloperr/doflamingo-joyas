import dotenv from 'dotenv';
import nodemailer from './config/nodemailer.js';

dotenv.config(); // Carga las variables de entorno desde .env

const sendTestEmail = async () => {
  try {
    await nodemailer.sendMail({
      from: process.env.GMAIL_USER,
      to: 'tecnoworld.presupuestos@gmail.com',
      subject: 'Correo de Prueba',
      text: 'Este es un correo de prueba para verificar la configuración de Nodemailer.'
    });
    console.log('Correo de prueba enviado con éxito.');
  } catch (error) {
    console.error('Error al enviar el correo de prueba:', error);
  }
};

sendTestEmail();
