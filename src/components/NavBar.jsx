import { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link  } from 'react-router-dom';
import { UserContext } from '../context/User.jsx';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import '../assets/icons.js';
import './navbar.css';


export function NavBar({ products = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { user, setUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUser(response.data);
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
    console.log("Prevented default submit");
    if (products.length > 0) {
      const filteredProducts = products.filter(product => {
        const title = product.name || '';
        return title.toLowerCase().includes(searchTerm.toLowerCase());
      });
  
      if (filteredProducts.length > 0) {
        const firstProductElement = document.getElementById(`product-${filteredProducts[0]._id}`);
        if (firstProductElement) {
          firstProductElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Si no se encuentran productos, muestra un SweetAlert
        Swal.fire({
          title: 'No se encontraron productos',
          text: '¿Deseas hacer un pedido personalizado?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Hacer pedido personalizado',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            window.open('https://wa.me/1234567890?text=Hola,%20me%20interesa%20hacer%20un%20pedido%20personalizado.', '_blank');
          }
        });
      }
    } else {
      // Si no hay productos disponibles
      Swal.fire({
        title: 'No hay productos disponibles',
        text: 'Por favor, inténtalo más tarde o haz un pedido personalizado.',
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Hacer pedido personalizado',
      }).then(() => {
        scrollToCustom(); // Desplaza a la sección personalizada
      });
    }
  };

  const handleUserIconClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        setUser(null);
        setIsModalOpen(false);
        window.location.href = '/';
      }
    });
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
        <div className="container mx-auto flex justify-between items-center h-16">
          <div className="flex items-center h-16">
            <Link to="/">
              <img src="./logo-doflamingo.png" alt="Mi E-commerce" className="h-16 w-auto" />
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
