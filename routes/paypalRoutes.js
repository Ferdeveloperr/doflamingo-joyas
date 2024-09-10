// src/routes/paypalRoutes.js
import express from 'express';
import paypal from '@paypal/checkout-server-sdk';
import client from '../paypalConfig.js';

const router = express.Router();

// Ruta para crear una orden de PayPal
router.post('/create-paypal-order', async (req, res) => {
  const { totalPrice } = req.body;  // Obtén el precio total desde el frontend

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: totalPrice.toString(),
      }
    }],
    application_context: {
      return_url: 'http://localhost:5173/checkout/success',  // Cambia esta URL según tu frontend
      cancel_url: 'http://localhost:5173/checkout/cancel',
    }
  });

  try {
    const order = await client.execute(request);

    // Encuentra el enlace de aprobación en la respuesta de PayPal
    const paymentUrl = order.result.links.find(link => link.rel === 'approve').href;

    if (paymentUrl) {
      res.status(200).json({ paymentUrl });
    } else {
      res.status(500).json({ message: 'No se encontró una URL de aprobación en la respuesta de PayPal' });
    }
  } catch (error) {
    console.error('Error al crear la orden de PayPal:', error);
    res.status(500).json({ message: 'Error al crear la orden de PayPal' });
  }
});

export default router;
