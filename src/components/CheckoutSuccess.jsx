import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './CheckoutSuccess.css'; // Asegúrate de que la ruta sea correcta

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const payerID = searchParams.get('PayerID');
    const paymentID = searchParams.get('paymentId');
    const token = searchParams.get('token');

    console.log('payerID:', payerID);
    console.log('paymentID:', paymentID);
    console.log('token:', token);

    const confirmPayment = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/paypal/confirm-payment', {
          payerID,
          paymentID,
          token,
        });

        console.log('Response:', response.data);

        if (response.data.success) {
          console.log('Redirigiendo a la página principal...');
          navigate('/'); // Redirige a la página principal
        } else {
          console.error('Error en la confirmación del pago:', response.data.message);
        }
      } catch (error) {
        console.error('Error al confirmar el pago:', error);
      }
    };

    if (payerID && paymentID && token) {
      confirmPayment();
    } else {
      console.error('Faltan parámetros de pago');
    }
  }, [navigate, searchParams]);

  useEffect(() => {
    // Redirige a la página principal después de 5 segundos si no se ha redirigido antes
    const timeout = setTimeout(() => {
      navigate('/'); // Redirige a la página principal
    }, 5000); // 5 segundos

    return () => clearTimeout(timeout); // Limpia el timeout si el componente se desmonta antes del tiempo
  }, [navigate]);

  return (
    <div className="checkout-success-container">
      <h1>¡Gracias por tu compra!</h1>
      <p>Serás redirigido a la página principal en breve...</p>
      <div className="loader"></div>
      {/* Si deseas, puedes añadir un botón para volver a la página principal manualmente */}
      <div className="button-container">
        <a href="/" className="button">Volver a la página principal</a>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
