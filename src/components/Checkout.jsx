import { useState } from 'react';
import axios from 'axios';
import { useCart } from '../hooks/useCart';
import './Checkout.css'; // Importa el archivo CSS

const Checkout = () => {
  const { state: cart } = useCart(); // Obtener el carrito del contexto
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Verificar si cart y cart.products existen
    if (!cart || !cart.products) {
      setError('El carrito está vacío o no está disponible.');
      setLoading(false);
      return;
    }

    const order = {
      userId: 'user_id', // Aquí debes obtener el ID del usuario actual
      products: cart.products.map(product => ({
        productId: product._id,
        quantity: product.quantity,
        price: product.price
      })),
      totalPrice: cart.totalPrice,
      status: 'pending',
      paymentMethod: paymentMethod,
      shippingAddress: shippingAddress,
      fullName: fullName,
      phoneNumber: phoneNumber,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/orders', order);
      const paymentUrl = response.data.paymentUrl;
      window.location.href = paymentUrl; // Redirige al usuario a la página de pago
    } catch (error) {
      setError('Error al crear la orden');
      console.error('Error al crear la orden:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre Completo:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>
        <label>
          Número de Teléfono:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Dirección de Envío:
          <input
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
        </label>
        <label>
          Método de Pago:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="credit_card">Tarjeta de Crédito</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>Confirmar Orden</button>
      </form>
    </div>
  );
};

export default Checkout;
