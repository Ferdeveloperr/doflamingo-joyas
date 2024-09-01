import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem('token'); // Obtén el token del localStorage
            
            try {
                const response = await axios.get('/api/cart', {
                    headers: {
                        Authorization: `Bearer ${token}` // Incluye el token en los headers
                    }
                });
                setCart(response.data.products);
            } catch (error) {
                console.log(error)
                console.error('Error al cargar el carrito', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const addToCart = async (product) => {
        const token = localStorage.getItem('token'); // Obtén el token del localStorage
        console.log('Token:', token);
        console.log('Producto:', product);
      
        try {
            const response = await axios.post('http://localhost:5000/api/cart/add', {
                productId: product._id,
                quantity: 1
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Incluye el token en los headers
                }
            });
            setCart(response.data.products);
            console.log(addToCart);
            
        } catch (error) {
            console.error('Error al agregar producto al carrito', error);
        }
    };

    const removeFromCart = async (product) => {
        const token = localStorage.getItem('token'); // Obtén el token del localStorage
        try {
            const response = await axios.delete(`/api/cart/remove/${product.id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Incluye el token en los headers
                }
            });
            setCart(response.data.products);
        } catch (error) {
            console.error('Error al eliminar producto del carrito', error);
        }
    };

    const clearCart = async () => {
        const token = localStorage.getItem('token'); // Obtén el token del localStorage
        try {
            await axios.delete('/api/cart/clear', {
                headers: {
                    Authorization: `Bearer ${token}` // Incluye el token en los headers
                }
            });
            setCart([]);
        } catch (error) {
            console.error('Error al limpiar el carrito', error);
        }
    };

    if (loading) {
        return <div>Cargando carrito...</div>;
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
