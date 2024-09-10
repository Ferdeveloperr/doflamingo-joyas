import './Products.css';
import { useProducts } from '../hooks/useProducts.js'; // Asegúrate de que la ruta sea correcta
import { ProductCard } from './ProductCard.jsx';
import { useCart } from '../hooks/useCart.js';

// En el archivo Products.jsx

export function Products() {
    const { addToCart, cart, removeFromCart } = useCart();
    const { products } = useProducts(); // Usa el hook useProducts para obtener los productos
  
    const checkProductInCart = (product) => {
      return cart.some((item) => item._id === product._id);
    };
  
    return (
      <main className='products'>
        <ul>
          {products.map((product) => {
            console.log('Rendering product:', product);
            const isProductInCart = checkProductInCart(product);
  
            return (
              <li key={product._id} id={`product-${product._id}`}>
                <ProductCard 
                  product={product} 
                  addToCart={addToCart} 
                  isProductInCart={isProductInCart} 
                  removeFromCart={removeFromCart} 
                />
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
  