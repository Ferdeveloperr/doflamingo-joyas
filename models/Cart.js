import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1 // Por defecto, al agregar un producto, la cantidad es 1
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar `totalPrice` y `updatedAt` antes de guardar
CartSchema.pre('save', function (next) {
  const cart = this;

  // Calcular el totalPrice
  cart.totalPrice = cart.products.reduce((total, product) => {
    return total + (product.quantity * product.productId.price);
  }, 0);

  // Actualizar la marca de tiempo de `updatedAt`
  cart.updatedAt = Date.now();

  next();
});

export default mongoose.model('Cart', CartSchema);
