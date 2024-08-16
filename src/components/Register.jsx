import './Register.css'; 
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Register({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        name,
        email,
        password
      });

      if (response.status === 201) {
        // Aquí puedes manejar el éxito, como redirigir al usuario, limpiar el formulario, etc.
        setSuccess('Registro exitoso');
        setError('');
        onClose(); // Cerrar el modal de registro si es exitoso
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Error al registrar');
      } else {
        setError('Error de conexión');
      }
    }
  };

  return (
    <div className="register-overlay">
      <div className="register-modal">
        <button className="register-close-button"><Link to ="/">X</Link></button>
        <h2 className="register-title">Registro</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="register-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="register-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="register-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="register-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="register-error">{error}</p>}
          {success && <p className="register-success">{success}</p>}
          <button type="submit" className="register-submit">Registrarse</button>
        </form>
        <p className="register-login">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </div>
    </div>
  );
}
