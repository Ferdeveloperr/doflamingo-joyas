import './Products.css';
import { useCart } from '../hooks/useCart.js';
import { ProductCard } from './ProductCard';

export function Products({ products }) {
    const { addToCart, cart = [], removeFromCart } = useCart();

    const checkProductInCart = (product) => {
        return cart.some((item) => item.id === product.id);
    };

    return (
        <main className='products'>
            <ul>
                {products.map((product) => {
                    const isProductInCart = checkProductInCart(product);

                    return (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            addToCart={addToCart} 
                            isProductInCart={isProductInCart} 
                            removeFromCart={removeFromCart} 
                        />
                    );
                })}
            </ul>
        </main>
    );
}
