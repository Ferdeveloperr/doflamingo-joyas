import { products as initialProducts} from   './mocks/products.json'
import { Products } from './components/Products.jsx'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { useFilter } from './hooks/useFilters.js'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/Cart.jsx'



function App() {
 
  const {filterProducts} = useFilter()
  const filteredProducts = filterProducts(initialProducts)

  return (
  <CartProvider>

  <Header/>
  <Cart/>
  <Products products={filteredProducts} />
  <Footer/>

  </CartProvider>

  )
}

export default App
