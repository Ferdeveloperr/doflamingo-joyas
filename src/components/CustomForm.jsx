import { useState } from 'react';
import './CustomForm.css';

export function CustomForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    alert('Formulario enviado');
    setIsModalOpen(false);
  };

  return (
    <div className="custom-form-container">
      <button className="open-modal-btn" onClick={toggleModal}>
        Solicitar Diseño Personalizado
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Solicitar Diseño Personalizado</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" placeholder="Tu nombre" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" id="email" placeholder="Tu correo electrónico" required />
              </div>
              <div className="form-group">
                <label htmlFor="details">Detalles del Diseño</label>
                <textarea id="details" placeholder="Describe tu diseño personalizado" required />
              </div>
              <button type="submit" className="submit-btn">Enviar Solicitud</button>
            </form>
            <button className="close-modal-btn" onClick={toggleModal}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}
