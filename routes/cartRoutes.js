import express from 'express';
import { addToCart, removeFromCart, clearCart } from '../services/cartController.js';
import AuthMiddleware from '../middleware/Auth.js';

const router = express.Router();

router.post('/add', AuthMiddleware, addToCart);
router.delete('/remove/:productId', AuthMiddleware, removeFromCart);
router.delete('/clear', AuthMiddleware, clearCart);

export default router;

