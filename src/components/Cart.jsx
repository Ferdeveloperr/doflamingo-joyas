import { useId } from 'react';
import { ClearCartIcon, CartIcon } from "./Icons.jsx";
import './Cart.css';
import { useCart } from "../hooks/useCart.js";
import { removeFromCart } from '../../services/cartController.js';



function CartItem({ thumbnail, title, price, quantity }) {
    return (
        <li>
            <img src={thumbnail} alt={title} />
            <div>
                <strong>{title}</strong>
                <button onClick={removeFromCart}>-</button> 
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
    const { cart = [], clearCart, addToCart, removeFromCart } = useCart(); // Asegúrate de que `cart` es un array

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
                                removeFromCart={() => removeFromCart(product)}
                                

                                
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
