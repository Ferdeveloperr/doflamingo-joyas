import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem('token'); // Obtén el token del localStorage

            if (!token) return; // Si no hay token, no intentes cargar el carrito
            
            try {
                const response = await axios.get('http://localhost:5000/api/cart', {
                    headers: {
                        Authorization: `Bearer ${token}` // Incluye el token en los headers
                    }
                });
                console.log('Cart response:', response.data); // <-- Agrega este log
                setCart(response.data.products);

                if (response.headers['content-type'].includes('application/json')) {
                    setCart(response.data.products);
                } else {
                    console.error('La respuesta no es un JSON', response);
                }
            } catch (error) {
                console.log(error)
                console.error('Error al cargar el carrito', error);
            } 
        };

        fetchCart();
        
    }, []);
    console.log('Cart:', cart);

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
            
            
        } catch (error) {
            console.error('Error al agregar producto al carrito', error);
        }
    };


// En el frontend
const removeFromCart = async (product) => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    console.log('Producto a eliminar:', product);
    try {
        const response = await axios.delete(`http://localhost:5000/api/cart/remove/${product._id}`, {
        
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        setCart(response.data.products);
        console.log('Remove Response:', response.data);
    } catch (error) {
        console.error('Error al eliminar producto del carrito', error);
    }
};




    const clearCart = async () => {
        const token = localStorage.getItem('token'); // Obtén el token del localStorage
        try {
            await axios.delete('http://localhost:5000/api/cart/clear', {
                headers: {
                    Authorization: `Bearer ${token}` // Incluye el token en los headers
                }
            });
            setCart([]);
        } catch (error) {
            console.error('Error al limpiar el carrito', error);
        }
    };

    // if (loading) {
    //     return <div>Cargando carrito...</div>;
    // }

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
