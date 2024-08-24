// src/components/WhatsAppButton.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const WhatsAppButton = () => {
  const whatsappNumber = '1126629808'; // Reemplaza con tu número de WhatsApp
  const message = 'Hola, me interesa saber más sobre...'; // Mensaje predeterminado
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

  return (
    <div className='wsp_style'>
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 ease-in-out"
      aria-label="Contactar por WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6" />
    </a>
    </div>
  );
}

export default WhatsAppButton;
