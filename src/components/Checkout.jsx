import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../hooks/useCart';
import { UserContext } from '../context/User';
import Swal from 'sweetalert2';
import './Checkout.css';
import OrderModal from './OrderModal';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, totalPrice } = useCart();
  const { user } = useContext(UserContext);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [loading, setLoading] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const CLIENT_ID = "AXSG0Id7SFwyt_2uilTmgNhK4yPPreubcHvfplr-sEM6cDNgd_bcKUrXLPUVgMlVDinH3hhhKg2P-0tI";
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user._id) {
      axios.get(`http://localhost:5000/api/orders/pending/${user._id}`)
        .then(response => {
            console.log('Respuesta de Verificación de Orden Pendiente:', response.data); // Log para verificar respuesta
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

    console.log('Datos de la Orden:', order); // Log para verificar datos enviados

    try {
      const response = await axios.post('http://localhost:5000/api/paypal/create-paypal-order', order, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Respuesta de PayPal:', response.data); // Log para verificar respuesta de PayPal

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
          window.location.href = paymentUrl;
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
  };

  const handleApprovePayPal = async (data, actions) => {
    try {
        console.log('Datos de PayPal al Aprobar:', data); // Log para verificar datos al aprobar
      await actions.order.capture();
      Swal.fire({
        icon: 'success',
        title: 'Pago Completado',
        text: `Pago realizado con éxito.`,
      });

      navigate('/checkout-success'); // Redirige a una página de éxito
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al Completar el Pago',
        text: error.message,
      });
      console.error('Error al capturar el pago:', error);
    }
  };

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
                placeholder="Ingrese su nombre y apellido"
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </label>
            <label>
              Correo Electrónico:
              <input
                type="email"
                value={email}
                placeholder="Ingrese su correo electrónico"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Número de Teléfono:
              <input
                type="text"
                value={phoneNumber}
                placeholder="Ingrese su número de teléfono"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </label>
            <label>
              Dirección de Envío:
              <input
                type="text"
                value={shippingAddress}
                placeholder="Ingrese su dirección de envío"
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
              <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    console.log('Datos de PayPal al Crear la Orden:', data); // Log para verificar datos al crear orden
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: totalPrice.toString(),
                        },
                      }],
                    });
                  }}
                  onApprove={handleApprovePayPal}
                />
              </PayPalScriptProvider>
            )}

            {paymentMethod !== 'paypal' && (
              <button type="submit" disabled={loading}>
                {loading ? 'Procesando...' : 'Confirmar Orden'}
              </button>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
