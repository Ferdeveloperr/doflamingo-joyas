
import './OrderModal.css'; // Asegúrate de tener un archivo CSS para estilos del modal

const OrderModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
        <div className="order-modal-overlay">
            <div className="order-modal-content">
                <button className="order-modal-close-button" onClick={onClose}>X</button>
                <h2>Orden Pendiente</h2>
                <p><strong>ID de la Orden:</strong> {order._id}</p>
                <p><strong>Estado:</strong> {order.status}</p>
                <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Total:</strong> ${order.totalPrice}</p>
                <p><strong>Dirección de Envío:</strong> {order.shippingAddress}</p>
                <p><strong>Nombre Completo:</strong> {order.fullName}</p>
                <p><strong>Número de Teléfono:</strong> {order.phoneNumber}</p>
                <p><strong>Método de Pago:</strong> {order.paymentMethod}</p>
            </div>
        </div>
    );
};

export default OrderModal;
