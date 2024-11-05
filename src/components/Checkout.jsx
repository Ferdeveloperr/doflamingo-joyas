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
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false); // Estado para controlar la confirmación de la orden
  const CLIENT_ID = "AXSG0Id7SFwyt_2uilTmgNhK4yPPreubcHvfplr-sEM6cDNgd_bcKUrXLPUVgMlVDinH3hhhKg2P-0tI";
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user._id) {
      axios.get(`https://doflax-1266745114d1.herokuapp.com/api/orders/pending/${user._id}`)
        .then(response => {
          console.log('Respuesta de Verificación de Orden Pendiente:', response.data);
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

  const handleOrderConfirmation = async (e) => {
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

    console.log('Datos de la Orden:', order);

    try {
      const response = await axios.post('https://doflax-1266745114d1.herokuapp.com/api/orders', order, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Orden creada:', response.data);

      Swal.fire({
        icon: 'success',
        title: 'Orden Confirmada',
        text: 'Tu orden ha sido confirmada. Ahora puedes proceder al pago.',
        showConfirmButton: false,
        timer: 3000,
      });

      setIsOrderConfirmed(true); // Actualizar el estado para mostrar PayPal
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al Confirmar la Orden',
        text: error.response ? error.response.data.message : error.message,
      });
      console.error('Error al confirmar la orden:', error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
    
  };
  

  const handleApprovePayPal = async (data, actions) => {
    try {
      console.log('Datos de PayPal al Aprobar:', data);
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
          <form onSubmit={handleOrderConfirmation}>
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

            {!isOrderConfirmed && (
              <button type="submit" disabled={loading}>
                {loading ? 'Procesando...' : 'Confirmar Orden'}
              </button>
            )}

            {isOrderConfirmed && paymentMethod === 'paypal' && (
              <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    console.log('Creando orden PayPal:', totalPrice);
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
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
