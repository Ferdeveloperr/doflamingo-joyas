

// Controlador para crear una nueva orden
import Order from '../models/Order.js';

// Controlador para crear una nueva orden
export const createOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice, paymentMethod, shippingAddress, fullName, phoneNumber, email } = req.body;

    // Crear la orden con los datos completos
    const order = new Order({
      userId,
      products,
      totalPrice,
      paymentMethod,
      shippingAddress,
      fullName,
      phoneNumber,
      email, // Agregar email
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Controlador para actualizar el estado de una orden
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para verificar si el usuario tiene una orden pendiente
export const checkPendingOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ userId: req.params.userId, status: 'pending' });

    if (order) {
      res.json({ hasPendingOrder: true, order });
    } else {
      res.json({ hasPendingOrder: false });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
