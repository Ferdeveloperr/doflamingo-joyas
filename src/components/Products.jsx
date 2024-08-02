import './Products.css'
import  {AddToCartIcon} from './Icons.jsx' 
// import PropTypes from 'prop-types';    
import { useCart } from '../hooks/useCart.js';

export function Products ({ products }) {
   const {addToCart} = useCart()

    

    return (
        <main className='products'>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <img src={product.thumbnail}
                         alt={product.title}
                        />
                        <div>
                            <strong>{product.title}</strong> - ${product.price}
                        </div>
                        <button onClick={() => addToCart(product)}>
                        <AddToCartIcon />
                        </button>
                    </li>

                ))} 
            </ul>
        </main> 
    )
}

// Products.propTypes = {
//     products: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         thumbnail: PropTypes.string.isRequired,
//         title: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//       })
//     ).isRequired,
//   };