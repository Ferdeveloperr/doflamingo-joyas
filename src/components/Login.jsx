import './Login.css'; 
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para el loader
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Activa el loader

    try {
      // Cambia la URL a la de tu backend desplegado
      const response = await axios.post('https://doflamingo-joyas-backend.vercel.app/login', {
        email,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido de nuevo.',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          setTimeout(() => {
            setLoading(false); // Desactiva el loader
            navigate('/');
            window.location.reload();
          }, 2000); // Retraso de 2 segundos (2000 ms) antes de redirigir
        });
      }
    } catch (error) {
      setLoading(false); // Desactiva el loader
      if (error.response) {
        setError(error.response.data.message || 'Error al iniciar sesión');
        Swal.fire({
          title: 'Error',
          text: error.response.data.message || 'Error al iniciar sesión',
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
    <div className="login-overlay">
      <div className="login-container">
        <button className="login-close-button">
          <Link to="/">X</Link>
        </button>
        <h2 className="login-title">Iniciar sesión</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="login-email"
              name="email"
              className="login-input"
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
              id="login-password"
              name="password"
              className="login-input"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Iniciando...' : 'Iniciar sesión'}
          </button>
        </form>
        <p className="login-password-reset">
          <Link to="/forgot-password">Olvidé mi contraseña</Link>
        </p>
        <p className="login-signup">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Iniciando sesión...</p>
          </div>
        )}
      </div>
    </div>
  );
}
