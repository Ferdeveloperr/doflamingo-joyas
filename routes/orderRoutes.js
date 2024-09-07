import express from 'express';
import { createOrder, updateOrder } from '../services/orderControllers.js';


const router = express.Router();

router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder);

export default router;
