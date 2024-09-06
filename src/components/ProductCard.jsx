import { useState } from 'react';
import Swal from 'sweetalert2';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx';
import './productCard.css';

export function ProductCard({ product, addToCart, isProductInCart, removeFromCart }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const shortDescription = product.description.split(' ').slice(0, 3).join(' ') + '...';
    console.log(product)

    const handleAddToCart = () => {
        addToCart(product);
        Swal.fire({
            title: '¡Producto agregado!',
            text: `${product.name} ha sido añadido a tu carrito.`,
            icon: 'success',
            confirmButtonText: '¡Genial!'
        });
    };

    const handleRemoveFromCart = () => {
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
