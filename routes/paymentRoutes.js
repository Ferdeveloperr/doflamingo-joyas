import express from 'express';
import mercadopago from '../mercadopagoConfig.js'; // Asegúrate de la ruta correcta

const router = express.Router();

router.post('/create-payment', async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    const paymentData = {
      transaction_amount: amount,
      description: `Orden #${orderId}`,
      payment_method_id: 'credit_card', // Puedes ajustar esto según tu método de pago
      payer_email: req.body.email,
      // Otras configuraciones según tu necesidad
    };

    const payment = await mercadopago.payment.save(paymentData);
    res.json({ id: payment.body.id, init_point: payment.body.init_point });
  } catch (error) {
    console.error('Error al crear el pago:', error);
    res.status(500).json({ error: 'Error al crear el pago' });
  }
});

export default router;
