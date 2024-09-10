

// import './Header.css';
import { Carousel } from './Carousel';

export function Header() {
  return (
    <>
      
      <header>
        <div className="bg-pink-500 text-white py-3 text-center">
          <span className="font-semibold text-md">¡Ediciones limitadas disponibles ahora! No te quedes sin las tuyas </span>
        </div>
        <Carousel />
        
      </header>
      
    </>
  );
}
