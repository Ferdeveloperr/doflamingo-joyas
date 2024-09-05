import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem('token');

            if (!token) return;

            try {
                const response = await axios.get('http://localhost:5000/api/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.headers['content-type'].includes('application/json')) {
                    setCart(response.data.products);
                } else {
                    console.error('La respuesta no es un JSON', response);
                }
            } catch (error) {
                console.error('Error al cargar el carrito', error);
            }
        };

        fetchCart();
    }, []);

    const fetchProductDetails = async (productIds) => {
        try {
            const response = await axios.post('http://localhost:5000/api/products/details', {
                ids: productIds
            });
            setProductDetails(response.data); // Almacena los detalles de los productos en el estado
        } catch (error) {
            console.error('Error al obtener los detalles de los productos', error);
        }
    };

    const addToCart = async (product) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:5000/api/cart/add', {
                productId: product._id,
                quantity: 1
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCart(response.data.products);
        } catch (error) {
            console.error('Error al agregar producto al carrito', error);
        }
    };

    const removeFromCart = async (product) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:5000/api/cart/remove', {
                productId: product.productId,
                quantity: 1
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCart(response.data.products);
        } catch (error) {
            console.error('Error al eliminar el producto del carrito', error);
        }
    };

    const clearCart = async () => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete('http://localhost:5000/api/cart/clear', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCart([]);
        } catch (error) {
            console.error('Error al limpiar el carrito', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, fetchProductDetails, productDetails }}>
            {children}
        </CartContext.Provider>
    );
}
