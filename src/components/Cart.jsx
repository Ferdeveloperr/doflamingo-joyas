import { useId } from 'react';
import { ClearCartIcon, CartIcon } from "./Icons.jsx";
import './Cart.css';
import { useCart } from "../hooks/useCart.js";

function CartItem({ thumbnail, title, price, quantity, addToCart }) {
    return (
        <li>
            <img src={thumbnail} alt={title} />
            <div>
                <strong>{title}</strong> - ${price}
            </div>
            <footer>
                <small>qty: {quantity}</small>
                <button onClick={addToCart}>+</button>
            </footer>
        </li>
    );
}

export function Cart() {
    const cartCheckboxId = useId();
    const { cart = [], clearCart, addToCart } = useCart(); // Asegúrate de que `cart` es un array

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
                                {...product}
                                
                            />
                        ))
                    ) : (
                        <li>Tu carrito está vacío.</li>
                    )}
                </ul>

                <button className='ButtonStyle' onClick={clearCart}>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    );
}
