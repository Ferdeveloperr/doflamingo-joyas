import './Login.css'; 
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });

      if (response.status === 200) {
        // Aquí puedes manejar el éxito, como guardar el token, redirigir al usuario, etc.
        console.log('Login successful:', response.data);
        
      } 
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Error al iniciar sesión');
      } else {
        setError('Error de conexión');
      }
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        
        <button className="login-close-button"><Link to="/">X </Link></button>
       
        <h2 className="login-title">Iniciar sesión</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="login-input"
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
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-submit">Iniciar sesión</button>
        </form>
        <p className="login-password-reset"><a href="#">Olvidé mi contraseña</a></p>
        <p className="login-signup">¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </div>
    </div>
  );
}
