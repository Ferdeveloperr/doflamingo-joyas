import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Obtener productos con filtrado
router.get('/', async (req, res) => {
  try {
    const { minPrice = 0, category = 'Todas' } = req.query;
    
    // Construir el objeto de filtros
    const filter = {
      price: { $gte: minPrice },
    };
    
    if (category !== 'Todas') {
      filter.category = category;
    }

    const products = await Product.find(filter); // Aplica los filtros en la consulta
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});


// Obtener un producto por su ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    console.log(product);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// Obtener detalles de múltiples productos por sus IDs
router.post('/details', async (req, res) => {
  try {
    const { ids } = req.body;
    const products = await Product.find({ _id: { $in: ids } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});



export default router;
