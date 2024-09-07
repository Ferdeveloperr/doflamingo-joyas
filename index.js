import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'; // Aquí importamos la exportación por defecto
import cartRoutes from './routes/cartRoutes.js'; // Importa las rutas del carrito
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import bodyParser from 'body-parser';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Para manejar JSON
app.use(bodyParser.json());

// Configurar CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Usar las rutas de usuario
app.use('/', userRoutes);
// Usa las rutas del carrito
app.use('/api/cart', cartRoutes); 
// Usa las rutas de los productos
app.use('/api/products', productRoutes);
// Usa las rutas de los pedidos
app.use('/api', orderRoutes); // Rutas de órdenes

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB', err));

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
