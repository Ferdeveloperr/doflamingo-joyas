import express from 'express';
import { createOrder, updateOrder, checkPendingOrder } from '../services/orderControllers.js';

const router = express.Router();

router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder);
router.get('/orders/pending/:userId', checkPendingOrder); // Nueva ruta para verificar órdenes pendientes

export default router;
