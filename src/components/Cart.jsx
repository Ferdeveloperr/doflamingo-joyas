import { useId } from 'react';
import { ClearCartIcon, CartIcon } from "./Icons.jsx";
import './Cart.css'
import { useCart } from "../hooks/useCart.js";



function CartItem ({ thumbnail , title, price, quantity, addToCart }) {
    return (
        <li>
                        <img
                        src={thumbnail}
                        alt={title} />

                        <div>
                            <strong>{title}</strong> - ${price}
                            
                        </div>

                        <footer>
                            <small onClick={addToCart}>
                                qty: {quantity}
                            </small>
                            <button>+</button>
                        </footer>
        </li>
    )
}
export function Cart () {


    const cartCheckboxId = useId()

    const { cart, clearCart, addToCart } = useCart()
    return (
        <>
            <label className='cart-button' htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input type="checkbox" id={cartCheckboxId} hidden />

            <aside className='cart'>
                <ul>
                    {cart.map(product =>  (
                    <CartItem
                     key={product.id}
                     addToCart={() => addToCart(product)}
                     {...product} />    
                    ))
                    }
                </ul>

                    <button className='ButtonStyle' onClick={clearCart}>
                        <ClearCartIcon />
                    </button>
                
            </aside>
        </>

    )
}