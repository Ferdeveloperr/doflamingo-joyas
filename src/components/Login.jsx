import './Login.css'; 
import { useState } from 'react';

export function Login({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Aquí puedes manejar el éxito, como guardar el token, redirigir al usuario, etc.
        console.log('Login successful:', data);
        onClose(); // Cerrar el modal de login si es exitoso
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <button className="login-close-button" onClick={onClose}>X</button>
        <h2 className="login-title">Iniciar sesión</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
        <p className="login-signup">¿No tienes cuenta? <a href="#">Regístrate</a></p>
      </div>
    </div>
  );
}
