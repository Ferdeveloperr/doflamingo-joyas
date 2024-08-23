import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/icons.js';
import './navbar.css';

export function NavBar() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const aboutSection = document.getElementById("contact");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };


  const scrollToCustom = () => {
    const aboutSection = document.getElementById("custom");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='containner'>
      <nav className="bg-black py-3">
        <div className="container mx-auto flex justify-between items-center h-16">
          <div className="flex items-center h-16">
            <Link to="/">
              <img src="./public/logo-doflamingo.png" alt="Mi E-commerce" className="h-16.5 w-auto" />
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
            <li><button onClick={scrollToCustom} className="styled-text" data-text="Personalizados">Personalizados</button></li>
            <li><button onClick={scrollToAbout} className="styled-text" data-text="Doflamingo">Doflamingo</button></li>
            <li><button onClick={scrollToContact} className="styled-text" data-text="Contacto">Contacto</button></li>
            <li>
              <Link to="/login">
                <button className="text-white ml-2">
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
