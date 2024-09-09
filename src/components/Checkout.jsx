import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../hooks/useCart';
import { UserContext } from '../context/User'; 
import Swal from 'sweetalert2'; 
import './Checkout.css'; 
import OrderModal from './OrderModal';

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
        setShowOrderModal(false); // Asegurarse de cerrar el modal correctamente
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
            status: 'pending',
            paymentMethod: paymentMethod,
            shippingAddress: shippingAddress,
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email, 
        };

        try {
            // Enviar la orden al backend
            const response = await axios.post('http://localhost:5000/api/orders', order, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Crear el pago en MercadoPago
            const paymentResponse = await axios.post('http://localhost:5000/api/payment/create-payment', {
                orderId: response.data.orderId,
                amount: totalPrice,
                email: email,
            });

            const { init_point } = paymentResponse.data;

            // Mostrar alerta de éxito y redirigir al usuario
            Swal.fire({
                icon: 'success',
                title: 'Orden Creada',
                text: 'Tu orden ha sido creada exitosamente. Serás redirigido a la página de pago.',
                showConfirmButton: false,
                timer: 3000,
            });

            // Redirigir al usuario a la página de pago
            setTimeout(() => {
                window.location.href = init_point;
            }, 3000);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al Crear la Orden',
                text: error.response ? error.response.data.error : error.message,
            });
            console.error('Error al crear la orden:', error);
        } finally {
            setLoading(false);
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
                        <button type="submit" disabled={loading}>
                            {loading ? 'Procesando...' : 'Confirmar Orden'}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Checkout;
