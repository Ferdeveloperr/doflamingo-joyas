import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx';
import './productCard.css';
import { UserContext } from '../context/User'; // Importa el contexto de usuario (ajusta la ruta según tu estructura)

export function ProductCard({ product, addToCart, isProductInCart, removeFromCart }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { user } = useContext(UserContext); // Accede al contexto del usuario para verificar si está logueado

    const shortDescription = product.description.split(' ').slice(0, 3).join(' ') + '...';

    const handleAddToCart = () => {
        if (!user) {
            Swal.fire({
                title: 'Inicia sesión',
                text: 'Necesitas iniciar sesión para agregar productos al carrito.',
                icon: 'warning',
                confirmButtonText: 'Iniciar sesión',
                cancelButtonText: 'Cancelar',
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirige al usuario a la página de inicio de sesión
                    window.location.href = '/login';
                }
            });
            return;
        }

        addToCart(product);
        Swal.fire({
            title: '¡Producto agregado!',
            text: `${product.name} ha sido añadido a tu carrito.`,
            icon: 'success',
            confirmButtonText: '¡Genial!'
        });
    };

    const handleRemoveFromCart = () => {
        if (!user) {
            Swal.fire({
                title: 'Inicia sesión',
                text: 'Necesitas iniciar sesión para eliminar productos del carrito.',
                icon: 'warning',
                confirmButtonText: 'Iniciar sesión',
                cancelButtonText: 'Cancelar',
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirige al usuario a la página de inicio de sesión
                    window.location.href = '/login';
                }
            });
            return;
        }

        removeFromCart(product);
        Swal.fire({
            title: '¡Producto eliminado!',
            text: `${product.name} ha sido eliminado de tu carrito.`,
            icon: 'info',
            confirmButtonText: 'De acuerdo'
        });
    };

    return (
        <div id={`product-${product._id}`} className="max-w-sm rounded overflow-hidden shadow-md bg-white m-4 transform transition duration-500 hover:scale-105">
            <div className="relative">
                <img 
                    className="w-full h-40 object-fit"
                    src={product.imageUrl} 
                    alt={product.name}
                />
            </div>
            <div className="px-6 py-6">
                <div className="font-semibold text-md text-[#ffb74d] text-center mb-2">{product.name}</div>
                <p className="font-bold text-center mb-2 rounded-lg">${product.price}</p>
                <p className="text-pink-400 text-center text-sm mb-2">
                    {isExpanded ? product.description : shortDescription}
                </p>
                <div className="px-6 py-6">
                    <div className="flex justify-center">
                        <button
                            className="text-pink-500 text-sm font-semibold"
                            onClick={() => setIsExpanded(!isExpanded)}>
                            {isExpanded ? 'Ver menos' : 'Ver más'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="px-6 pt-2 pb-4 flex justify-center">
                <button 
                    onClick={() => isProductInCart ? handleRemoveFromCart() : handleAddToCart()}
                    className="bg-[#ffb74d] hover:bg-[#d3963b] text-white font-base py-1 px-3 rounded-md flex items-center justify-center transition-colors duration-500 ease-in-out"
                >
                    {isProductInCart ? (
                        <>
                            <RemoveFromCartIcon className="mr-2" />
                            Quitar
                        </>
                    ) : (
                        <>
                            <AddToCartIcon className="mr-2" />
                            Agregar
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
