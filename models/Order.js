import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
  }],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  paymentMethod: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  fullName: { type: String, required: true }, // Agregado
  phoneNumber: { type: String, required: true }, // Agregado
  email: { type: String, required: true }, // Agregado
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
