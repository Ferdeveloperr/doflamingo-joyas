import { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/forgot-password', { email });
      
      if (response.status === 200) {
        setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
        setError('');
      }
    } catch (error) {
      setError('No se pudo enviar el enlace de recuperación. Asegúrate de que el correo sea correcto.');
      setMessage('');
    }
  };

  return (
    <div className="forgot-password-overlay">
      <div className="forgot-password-container">
        <button className="forgot-password-close-button" onClick={() => window.history.back()}>X</button>
        <h2 className="forgot-password-title">Recuperar Contraseña</h2>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="forgot-password-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {message && <p className="forgot-password-success">{message}</p>}
          {error && <p className="forgot-password-error">{error}</p>}
          <button type="submit" className="forgot-password-submit">Enviar Enlace</button>
        </form>
      </div>
    </div>
  );
}
