import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js'; // Aquí importamos la exportación por defecto

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Para manejar JSON

// Usar las rutas de usuario
app.use('/api', userRoutes);

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB', err));

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

