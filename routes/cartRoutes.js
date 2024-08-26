import express from 'express';
import Cart from '../models/Cart.js';
import { AuthMiddleware } from '../middleware/Auth.js';

const router = express.Router();

// Obtener el carrito del usuario logueado
router.get('/', AuthMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('products.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Agregar un producto al carrito
router.post('/add', AuthMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = new Cart({ user: req.user._id, products: [], totalPrice: 0 });
    }
    
    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (productIndex >= 0) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    // Aquí deberías calcular el precio total sumando los productos
    // cart.totalPrice += /* lógica para calcular el precio total */;

    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

// Eliminar un producto del carrito
router.delete('/remove/:productId', AuthMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    cart.products = cart.products.filter(p => p.productId.toString() !== req.params.productId);

    // Aquí deberías calcular el precio total restando el producto eliminado
    // cart.totalPrice -= /* lógica para calcular el precio total */;

    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
});

export default router;
