
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx';

export function ProductCard({ product, addToCart, isProductInCart, removeFromCart }) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-md bg-white text-white m-4 transform transition duration-500 hover:scale-105 " >
            <img className="w-full h-30 object-cover" src={product.thumbnail} alt={product.title} />
            <div className="px-6 py-6 ">
                <div className="font-bold text-xl mb-2" >{product.title}</div>
                <p className="text-pink-500 text-base mb-2" >
                    ${product.price}
                </p>
                <p className="text-pink-400 text-base mb-2 ">
                    {product.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
            <button 
                    onClick={() => isProductInCart ? removeFromCart(product) : addToCart(product)}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-base py-2 px-4 rounded-full flex items-center justify-center"
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
