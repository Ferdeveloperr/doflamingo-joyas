

// import './Header.css';
import { Carousel } from './Carousel';

export function Header() {
  return (
    <>
      
      <header>
        <div className="bg-pink-500 text-white py-3 text-center">
          <span className="font-semibold text-md">¡Gran Oferta! Obtén un 20% de descuento en tu primera compra. Usa el código: <strong>JOY20</strong></span>
        </div>
        <Carousel />
        
      </header>
      
    </>
  );
}
