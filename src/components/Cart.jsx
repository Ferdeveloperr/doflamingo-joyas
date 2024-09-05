import { useId } from 'react';
import Swal from 'sweetalert2';
import { ClearCartIcon, CartIcon } from "./Icons.jsx";
import './Cart.css';
import { useCart } from "../hooks/useCart.js";

function CartItem({ thumbnail, title, price, quantity, removeFromCart }) {
    const handleRemove = () => {
        removeFromCart();
        Swal.fire({
            title: 'Producto eliminado',
            text: `Has eliminado el producto del carrito.`,
            icon: 'success',
            confirmButtonText: 'Ok'
            
        });
    };

    return (
        <li>
            <img src={thumbnail} alt={title} />
            <div>
                <strong>{title}</strong>
                <button onClick={handleRemove}>-</button>
                ${price}
            </div>
            <footer>
                <small>qty: {quantity}</small>
            </footer>
        </li>
    );
}

export function Cart() {
    const cartCheckboxId = useId();
    const { cart, clearCart, addToCart, removeFromCart } = useCart();

    const handleClearCart = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Esto eliminará todos los productos del carrito!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, limpiar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart();
                Swal.fire(
                    'Carrito limpio',
                    'Todos los productos han sido eliminados del carrito.',
                    'success'
                );
            }
        });
    };

    return (
        <>
            <label className='cart-button' htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input type="checkbox" id={cartCheckboxId} hidden />

            <aside className='cart'>
                <ul>
                    {cart.length > 0 ? (
                        cart.map(product => (
                            <CartItem
                                key={product._id}
                                addToCart={() => addToCart(product)}
                                removeFromCart={() => removeFromCart(product)}
                                {...product}
                            />
                        ))
                    ) : (
                        <li>Tu carrito está vacío.</li>
                    )}
                </ul>

                <button className='ButtonStyle' onClick={handleClearCart}>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    );
}
