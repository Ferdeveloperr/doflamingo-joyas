import './Products.css';
import { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart.js';
import { ProductCard } from './ProductCard';
import axios from 'axios';

export function Products() {
    const { addToCart, cart = [], removeFromCart } = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Realiza la solicitud al backend para obtener los productos
        axios.get('http://localhost:5000/api/products')  // Asegúrate de que la URL coincida con la de tu backend
            .then(response => {
                setProducts(response.data);  // Guarda los productos en el estado
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

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
                            key={product._id} 
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
