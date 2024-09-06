import './Products.css';
import { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart.js';
import { ProductCard } from './ProductCard';
import axios from 'axios';

export function Products() {
    const { addToCart, cart, removeFromCart } = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(response => {
                setProducts(response.data);
                console.log('Fetched products:', response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    

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
