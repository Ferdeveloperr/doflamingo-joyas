import './Register.css'; 
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook para redireccionar

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        name,
        email,
        password
      });

      if (response.status === 201) {
        // Redirigir al usuario a la página de inicio de sesión
        Swal.fire({
          title: 'Registro exitoso',
          text: 'Tu cuenta ha sido creada con éxito.',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          navigate('/login'); // Redirigir a la página de inicio de sesión
        });
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Error al registrar');
        Swal.fire({
          title: 'Error',
          text: error.response.data.message || 'Error al registrar',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      } else {
        setError('Error de conexión');
        Swal.fire({
          title: 'Error de conexión',
          text: 'No se pudo conectar con el servidor.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    }
  };

  return (
    <div className="register-overlay">
      <div className="register-modal">
        <button className="register-close-button">
          <Link to="/">X</Link>
        </button>
        <h2 className="register-title">Registro</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="register-input"
              placeholder="Ingresa tu nombre"
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
              placeholder="Ingresa tu correo electrónico"
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
              placeholder="Ingresa tu contraseña"
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
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="register-error">{error}</p>}
          <button type="submit" className="register-submit">Registrarse</button>
        </form>
        <p className="register-login">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
