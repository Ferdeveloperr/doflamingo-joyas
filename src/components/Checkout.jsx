import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../hooks/useCart';
import { UserContext } from '../context/User'; // Importar el UserContext
import Swal from 'sweetalert2'; // Importar SweetAlert2
import './Checkout.css'; // Importa el archivo CSS
import OrderModal from './OrderModal'; // Importa el componente modal

const Checkout = () => {
    const { cart, totalPrice } = useCart(); // Obtener el carrito y el totalPrice del contexto
    const { user } = useContext(UserContext); // Obtener el usuario desde el UserContext
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [loading, setLoading] = useState(false);
    const [pendingOrder, setPendingOrder] = useState(null); // Nuevo estado para la orden pendiente
    const [showOrderModal, setShowOrderModal] = useState(false); // Nuevo estado para mostrar el modal

    useEffect(() => {
        if (user && user._id) {
            axios.get(`http://localhost:5000/api/orders/pending/${user._id}`)
                .then(response => {
                    if (response.data.hasPendingOrder) {
                        console.log('Orden pendiente:', response.data.order);
                        setPendingOrder(response.data.order); // Guardar la orden pendiente en el estado
                        setShowOrderModal(true); // Mostrar el modal con la orden pendiente
                    }
                })
                .catch(error => {
                    console.error('Error al verificar orden pendiente:', error);
                });
        }
    }, [user]);

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
                text: 'El usuario no está autenticado.',
            });
            setLoading(false);
            return;
        }

        const order = {
            userId: user._id, // Obtener el ID del usuario desde el contexto
            products: cart.map(product => ({
                productId: product.productId, // Asegúrate de que uses productId
                quantity: product.quantity,
            })),
            totalPrice: totalPrice,
            status: 'pending',
            paymentMethod: paymentMethod,
            shippingAddress: shippingAddress,
            fullName: fullName,
            phoneNumber: phoneNumber,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/orders', order, {
                headers: {
                    'Content-Type': 'application/json', // Asegúrate de que este encabezado esté presente
                },
            });
            const paymentUrl = response.data.paymentUrl;
            window.location.href = paymentUrl; // Redirige al usuario a la página de pago
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
            {showOrderModal && <OrderModal order={pendingOrder} onClose={() => setShowOrderModal(false)} />}
            {!showOrderModal && (
                <>
                    <h2>Checkout</h2>
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
                </>
            )}
        </div>
    );
};

export default Checkout;
