import Cart from '../models/Cart.js';
import Product from '../models/Product.js'; // Asegúrate de importar el modelo de Producto

// Agregar un producto al carrito
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;
    console.log('Add to Cart Request:', { userId, productId, quantity });

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    // Recalcular el precio total
    cart.totalPrice = await calculateTotalPrice(cart);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
};

// Función para calcular el precio total
const calculateTotalPrice = async (cart) => {
  let totalPrice = 0;

  for (const item of cart.products) {
    const product = await Product.findById(item.productId);
    if (product) {
      totalPrice += product.price * item.quantity;
    }
  }

  return totalPrice;
};

// Eliminar un producto del carrito
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);

    // Recalcular el precio total
    cart.totalPrice = await calculateTotalPrice(cart);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
};

// Limpiar el carrito
export const clearCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    cart.products = [];
    cart.totalPrice = 0;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al limpiar el carrito' });
  }
};
