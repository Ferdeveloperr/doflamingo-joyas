import { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/User';
import axios from 'axios';
import '../assets/icons.js';
import './navbar.css';

export function NavBar({ products = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { user, setUser } = useContext(UserContext); // Accede a la función de logout desde el contexto
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal


  useEffect(() => {
    // Intenta obtener los datos del usuario desde el localStorage al cargar el componente
    const token = localStorage.getItem('token');
    if (token) {
      // Suponiendo que tienes un endpoint para obtener datos del usuario por token
      axios.get('http://localhost:5000/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
       
        setUser(response.data); // Actualiza el contexto con los datos del usuario
        console.log('Usuario obtenido:', response.data); // Verifica que el usuario se obtenga correctamente
      })
      .catch(error => {
        console.error('Error al obtener los datos del usuario:', error);
      });
    }
  }, [setUser]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (products.length > 0) {
      const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      console.log('Productos filtrados:', filteredProducts);

      if (filteredProducts.length > 0) {
        const firstProductElement = document.getElementById(`product-${filteredProducts[0].id}`);
        if (firstProductElement) {
          firstProductElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        alert('No se encontraron productos que coincidan con tu búsqueda');
      }
    } else {
      alert('No hay productos disponibles para buscar');
    }
  };

  const handleUserIconClick = () => {
    setIsModalOpen(true); // Abre el modal al hacer clic en el ícono de usuario
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsModalOpen(false); // Cierra el modal después de cerrar sesión
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToCustom = () => {
    const customSection = document.getElementById("custom");
    if (customSection) {
      customSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='containner'>
      <nav className="bg-black">
        <div className="container mx-auto flex justify-between items-center h-18">
          <div className="flex items-center h-18">
            <Link to="/">
              <img src="./public/logo-doflamingo.png" alt="Mi E-commerce" className="h-18 w-auto" />
            </Link>
          </div>
          <div className="ml-4">
            <form className="relative mr-3" onSubmit={handleSearchSubmit}>
              <input 
                type="text" 
                placeholder="Escriba para buscar aquí" 
                className="bg-white-800 text-black rounded-full pl-6 pr-14 py-0.5 focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button 
                type="submit" 
                className="absolute right-1 top-0 mt-1 mr-3 text-gray-500 hover:text-black button-search"
              >
                <FontAwesomeIcon icon="search" />
              </button>
            </form>
          </div>
          <ul className="ul-nav flex space-x-4 pr-4 ml-1 align-center justify-center">
            <li><button onClick={scrollToCustom} className="styled-text" data-text="Personalizados">Personalizados</button></li>
            <li><button onClick={scrollToAbout} className="styled-text" data-text="Doflamingo">Doflamingo</button></li>
            <li><button onClick={scrollToContact} className="styled-text" data-text="Contacto">Contacto</button></li>
            <li>
              {user ? (
                <button className="text-white ml-2" onClick={handleUserIconClick}>
                  <FontAwesomeIcon icon="user" size="lg" className="mr-2" />
                  <p className='login-style'>Hola, {user.name}</p>
                </button>
              ) : (
                <Link to="/login">
                  <button className="text-white ml-2">
                    <FontAwesomeIcon icon="user" size="lg" className="mr-2" /><p className='login-style'>Inicia sesión</p>
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={handleCloseModal}>
              X
            </button>
            <h2 className="modal-title">Información del Usuario</h2>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Correo electrónico:</strong> {user.email}</p>
            <button className="modal-logout-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
