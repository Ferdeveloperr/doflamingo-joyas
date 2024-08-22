// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/icons.js';
import './navbar.css';


export function NavBar() {
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
          <form className="relative">
            <input 
              type="text" 
              placeholder="Escriba para buscar aquí" 
              className="bg-white-800 text-black rounded-full pl-6 pr-14 py-0.5 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button 
              type="submit" 
              className="absolute right-0 top-0 mt-1 mr-3 text-gray-500 hover:text-black button-search"
            >
              <FontAwesomeIcon icon="search" />
            </button>
          </form>
        </div>
        <ul className="flex space-x-4 pr-4 ml-1" >
          <li><a href="#" className="styled-text" data-text="Home">Home</a></li>
          <li><a href="#" className="styled-text" data-text="Personalizados">Personalizados</a></li>
          <li><a href="#" className="styled-text" data-text="Doflamingo">Doflamingo</a></li>
          <li><a href="#" className="styled-text" data-text="Contacto">Contacto</a></li>
          <li>
            <Link to="/login">
              <button className="text-white ml-1">
                <FontAwesomeIcon icon="user" size="lg" className="mr-2"  /><p className='login-style'>login</p>
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    </div>
  );
}
