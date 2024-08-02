import { useId } from "react";
import { ClearCartIcon, CartIcon } from "./Icons.jsx";
import './Cart.css'

export function Cart () {

    const cartCheckboxId = useId()
    return (
        <>
            <label className='cart-button' htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input type="checkbox" id={cartCheckboxId} hidden />

            <aside className='cart'>
                <ul>
                    <li>
                        <img
                        src='https://joyaspino.com/wp-content/uploads/2022/12/AO-7-600x600.jpg'
                        alt='Random img' />

                        <div>
                            <strong>Random Product</strong> - $499
                        </div>

                        <footer>
                            <small>
                                qty: 1
                            </small>
                            <button>+</button>
                        </footer>
                    </li>
                    <button className='ButtonStyle'>
                        <ClearCartIcon />
                    </button>
                </ul>
            </aside>
        </>

    )
}