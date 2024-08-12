import './Login.css'; 

export function Login({ onClose }) {
  return (
    <div className="login-overlay">
      <div className="login-container">
        <button className="login-close-button" onClick={onClose}>X</button>
        <h2 className="login-title">Iniciar sesión</h2>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input type="text" id="username" name="username" className="login-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" className="login-input" required />
          </div>
          <button type="submit" className="login-submit">Iniciar sesión</button>
        </form>
        <p className="login-password-reset"><a href="#">Olvidé mi contraseña</a></p>
        <p className="login-signup">¿No tienes cuenta? <a href="#">Regístrate</a></p>
      </div>
    </div>
  );
}
