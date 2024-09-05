import { useId } from 'react';
import Swal from 'sweetalert2';
import { ClearCartIcon, CartIcon } from "./Icons.jsx";
import './Cart.css';
import { useCart } from "../hooks/useCart.js";

function CartItem({ thumbnail, name, price, quantity, removeFromCart }) {
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
        <li className="cart-item">
            <img className="cart-item-img" src={thumbnail} alt={name} />
            <div className="cart-item-details">
                <strong className="cart-item-title">{name}</strong>
                <p className="cart-item-price">${price}</p>
                <small>Cantidad: {quantity}</small>
            </div>
            <button className="cart-item-remove" onClick={handleRemove}>Eliminar</button>
        </li>
    );
}

export function Cart() {
    const cartCheckboxId = useId();
    const { cart, clearCart, removeFromCart } = useCart();

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
                                name={product.name}
                                thumbnail={product.imageUrl}
                                price={product.price}
                                quantity={product.quantity}
                                removeFromCart={() => removeFromCart(product)}
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
