import { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Para hacer las solicitudes al backend

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cargar el carrito del backend cuando el componente se monte
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('/api/cart'); // Ajusta la ruta según tu configuración
                setCart(response.data.products);
            } catch (error) {
                console.error('Error al cargar el carrito', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    // Agregar un producto al carrito
    const addToCart = async (product) => {
        try {
            const response = await axios.post('http://localhost:5000/api/cart/add', {
                productId: product.id,
                quantity: 1
            });
            setCart(response.data.products);
        } catch (error) {
            console.error('Error al agregar producto al carrito', error);
        }
    };

    // Eliminar un producto del carrito
    const removeFromCart = async (product) => {
        try {
            const response = await axios.delete(`/api/cart/remove/${product.id}`);
            setCart(response.data.products);
        } catch (error) {
            console.error('Error al eliminar producto del carrito', error);
        }
    };

    // Limpiar el carrito
    const clearCart = async () => {
        try {
            await axios.delete('/api/cart/clear');
            setCart([]);
        } catch (error) {
            console.error('Error al limpiar el carrito', error);
        }
    };

    if (loading) {
        return <div>Cargando carrito...</div>; // Puedes agregar un spinner u otra indicación de carga
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
