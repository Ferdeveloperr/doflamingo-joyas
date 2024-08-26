import { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';
import { useCart } from '../hooks/useCart.js';
import { Products } from './Products';

export function ProductsContainer() {
    const [products, setProducts] = useState([]);
    const { addToCart, cart, removeFromCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products'); // La ruta a tu API que devuelve los productos
                setProducts(response.data); // Asumiendo que el backend devuelve un array de productos
            } catch (error) {
                console.error('Error al obtener los productos', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Products 
            products={products} 
            addToCart={addToCart} 
            cart={cart} 
            removeFromCart={removeFromCart} 
        />
    );
}
