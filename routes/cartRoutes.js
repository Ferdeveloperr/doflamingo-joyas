import express from 'express';
import { addToCart, removeFromCart, clearCart, getCart } from '../services/cartController.js';
import AuthMiddleware from '../middleware/Auth.js';

const router = express.Router();

router.post('/add', AuthMiddleware, addToCart);
router.delete('/remove/:productId', AuthMiddleware, removeFromCart);
router.delete('/clear', AuthMiddleware, clearCart);
router.get('/', AuthMiddleware, getCart); // Nueva ruta para obtener el carrito


export default router;

