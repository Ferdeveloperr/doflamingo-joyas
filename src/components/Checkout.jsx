import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../hooks/useCart';
import { UserContext } from '../context/User';
import Swal from 'sweetalert2';
import './Checkout.css';
import OrderModal from './OrderModal';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const Checkout = () => {
  const { cart, totalPrice } = useCart();
  const { user } = useContext(UserContext);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    if (user && user._id) {
      axios.get(`http://localhost:5000/api/orders/pending/${user._id}`)
        .then(response => {
          if (response.data.hasPendingOrder) {
            setPendingOrder(response.data.order);
            setShowOrderModal(true);
          }
        })
        .catch(error => {
          console.error('Error al verificar orden pendiente:', error);
        });
    }
  }, [user]);

  const handleCloseModal = () => {
    setShowOrderModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!cart || cart.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Carrito Vacío',
        text: 'El carrito está vacío o no está disponible.',
      });
      setLoading(false);
      return;
    }

    if (!user || !user._id) {
      Swal.fire({
        icon: 'error',
        title: 'Usuario No Autenticado',
        text: 'Por favor, inicia sesión para continuar con la compra.',
      });
      setLoading(false);
      return;
    }

    const order = {
      userId: user._id,
      products: cart.map(product => ({
        productId: product.productId,
        quantity: product.quantity,
      })),
      totalPrice: totalPrice,
      paymentMethod: paymentMethod,
      shippingAddress: shippingAddress,
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
    };

    try {
        const response = await axios.post('http://localhost:5000/api/paypal/create-paypal-order', order, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        

      console.log(response.data); // Verifica la respuesta completa de la API

      const paymentUrl = response.data.paymentUrl;

      if (paymentUrl) {
        Swal.fire({
          icon: 'success',
          title: 'Orden Creada',
          text: 'Tu orden ha sido creada exitosamente. Serás redirigido a la página de pago.',
          showConfirmButton: false,
          timer: 3000,
        });

        setTimeout(() => {
          window.location.href = paymentUrl; // Redirige al usuario a la página de pago después de 3 segundos
        }, 3000);
      } else {
        throw new Error('No se obtuvo una URL de pago de PayPal');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al Crear la Orden',
        text: error.response ? error.response.data.message : error.message,
      });
      console.error('Error al crear la orden:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="checkout-container">
      {showOrderModal && <OrderModal order={pendingOrder} onClose={handleCloseModal} />}
      {!pendingOrder && !showOrderModal && (
        <>
          <h2>Checkout</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Nombre Completo:
              <input
                type="text"
                value={fullName}
                placeholder='Ingrese su nombre y apellido'
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </label>
            <label>
              Correo Electrónico:
              <input
                type="email"
                value={email}
                placeholder='Ingrese su correo electronico'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Número de Teléfono:
              <input
                type="text"
                value={phoneNumber}
                placeholder='Ingrese su numero de telefono'
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </label>
            <label>
              Dirección de Envío:
              <input
                type="text"
                value={shippingAddress}
                placeholder='Ingrese su direccion de envío'
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

            {paymentMethod === 'paypal' && (
              <PayPalScriptProvider options={{ "client-id": "tu-client-id" }}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: totalPrice.toString(),
                        },
                      }],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then(details => {
                      Swal.fire({
                        icon: 'success',
                        title: 'Pago Completado',
                        text: `Pago realizado con éxito por ${details.payer.name.given_name}`,
                      });
                    });
                  }}
                />
              </PayPalScriptProvider>
            )}

            {paymentMethod !== 'paypal' && (
              <button type="submit" disabled={loading}>Confirmar Orden</button>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
