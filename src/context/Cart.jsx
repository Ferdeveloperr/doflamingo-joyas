import  {createContext, useState} from 'react'

export const CartContext = createContext()

export function CartProvider ({ children }) {
    const {Cart, setCart} = useState([])

    const addToCart = product => {

        const productInCartIndex = Cart.findIndex ( item => item.id === product.id) 

        //Structure clone to avoid mutating state
        if (productInCartIndex >= 0) {
            const newCart = structuredClone(Cart)
            newCart[productInCartIndex].quantity +=1
          return  setCart(newCart)
    } 

    setCart(prevState => ([
        ...prevState, 
        {
            ...product,
             quantity: 1
            }
        ]))
}

    const clearCart = () => {
        setCart([])
    } 

    return (
        <CartContext.Provider value={{
            Cart: Cart,
            addToCart, 
            clearCart}}>

            {children}
        </CartContext.Provider>
    )
}