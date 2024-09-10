import paypal from '@paypal/checkout-server-sdk';
import client from '../paypalConfig.js';
import Order from '../models/Order.js'; // Importa el modelo Order para actualizar el estado

// Crear una orden de PayPal
export const createPayPalOrder = async (req, res) => {
  const { totalPrice, orderId } = req.body; // Obtén el precio total y el ID de la orden desde el frontend

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
      return_url: `http://localhost:5173/checkout/success?orderId=${orderId}`,  // Cambia esta URL según tu frontend
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
};

// Manejar el retorno de PayPal después de un pago exitoso
export const handlePayPalSuccess = async (req, res) => {
  const { token, orderId } = req.query; // Captura los parámetros de la URL de retorno

  try {
    const request = new paypal.orders.OrdersCaptureRequest(token);
    const capture = await client.execute(request);

    // Verifica si la orden está completada en PayPal
    if (capture.result.status === 'COMPLETED') {
      // Actualiza el estado de la orden en tu base de datos
      const dbOrder = await Order.findById(orderId); // Encuentra la orden por el ID proporcionado

      if (dbOrder) {
        dbOrder.status = 'completed';
        await dbOrder.save();
        res.redirect('http://localhost:5173/checkout/success'); // Redirige al usuario al éxito del pago
      } else {
        res.status(404).json({ message: 'Orden no encontrada' });
      }
    } else {
      res.status(400).json({ message: 'Pago no completado' });
    }
  } catch (error) {
    console.error('Error al verificar el pago:', error);
    res.status(500).json({ message: 'Error al verificar el pago' });
  }
};

// Manejar el retorno de PayPal después de un pago cancelado
export const handlePayPalCancel = (req, res) => {
  res.redirect('http://localhost:5173/checkout/cancel'); // Redirige al usuario a la página de cancelación del pago
};
