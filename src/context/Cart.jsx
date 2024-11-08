import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem('token');

            if (!token) return;

            try {
                const response = await axios.get('https://doflax-1266745114d1.herokuapp.com/api/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.headers['content-type'].includes('application/json')) {
                    setCart(response.data.products);
                    setTotalPrice(response.data.totalPrice); // Actualizar el totalPrice
                    const productIds = response.data.products.map(item => item.productId);
                    fetchProductDetails(productIds); // Cargar los detalles de los productos cuando se carga el carrito
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
            const response = await axios.post('https://doflax-1266745114d1.herokuapp.com/api/products/details', {
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
            const response = await axios.post('https://doflax-1266745114d1.herokuapp.com/api/cart/add', {
                productId: product._id,
                quantity: 1
                  
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCart(response.data.products);
            setTotalPrice(response.data.totalPrice); // Actualizar el totalPrice
            const productIds = response.data.products.map(item => item.productId); // Asegura que los detalles se actualicen
            fetchProductDetails(productIds); // Llamar nuevamente a fetchProductDetails para actualizar los detalles
        } catch (error) {
            console.error('Error al agregar producto al carrito', error);
        }
    };

    const removeFromCart = async (product) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('https://doflax-1266745114d1.herokuapp.com/api/cart/remove', {
                productId: product.productId,
                quantity: 1
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCart(response.data.products);
            setTotalPrice(response.data.totalPrice); // Actualizar el totalPrice
            const productIds = response.data.products.map(item => item.productId); // Asegura que los detalles se actualicen
            fetchProductDetails(productIds); // Actualiza los detalles después de eliminar
        } catch (error) {
            console.error('Error al eliminar el producto del carrito', error);
        }
    };

    const clearCart = async () => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete('https://doflax-1266745114d1.herokuapp.com/api/cart/clear', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCart([]);
            setTotalPrice(0); // Limpiar el totalPrice cuando el carrito esté vacío
            setProductDetails([]); // Limpiar detalles del producto cuando el carrito esté vacío
        } catch (error) {
            console.error('Error al limpiar el carrito', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, productDetails, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}
