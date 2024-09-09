import './OrderModal.css'; 

const OrderModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
        <div className="order-modal-overlay">
            <div className="order-modal-content">
                <button className="order-modal-close-button" onClick={onClose}>✖</button>
                <h2>Resumen de tu Orden Pendiente</h2>
                <div className="order-info-container">
                    <div className="order-info-item">
                        <h3>ID de la Orden:</h3>
                        <p>{order._id}</p>
                    </div>
                    <div className="order-info-item">
                        <h3>Estado:</h3>
                        <p className={`status-${order.status}`}>{order.status}</p>
                    </div>
                    <div className="order-info-item">
                        <h3>Fecha de creación:</h3>
                        <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="order-info-item">
                        <h3>Total:</h3>
                        <p>${order.totalPrice}</p>
                    </div>
                    <div className="order-info-item">
                        <h3>Dirección de Envío:</h3>
                        <p>{order.shippingAddress}</p>
                    </div>
                    <div className="order-info-item">
                        <h3>Nombre Completo:</h3>
                        <p>{order.fullName}</p>
                    </div>
                    <div className="order-info-item">
                        <h3>Número de Teléfono:</h3>
                        <p>{order.phoneNumber}</p>
                    </div>
                    <div className="order-info-item">
                        <h3>Método de Pago:</h3>
                        <p>{order.paymentMethod === 'credit_card' ? 'Tarjeta de Crédito' : 'PayPal'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
