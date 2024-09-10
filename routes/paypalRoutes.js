import express from 'express';
import { createPayPalOrder, handlePayPalSuccess, handlePayPalCancel } from '../services/paypalControllers.js'; // Asegúrate de que estos controladores existan

const router = express.Router();

// Ruta para crear una orden de PayPal
router.post('/create-paypal-order', createPayPalOrder);

// Ruta para manejar el retorno de PayPal después de un pago exitoso
router.get('/paypal-success', handlePayPalSuccess);

// Ruta para manejar el retorno de PayPal después de un pago cancelado
router.get('/paypal-cancel', handlePayPalCancel);

export default router;
