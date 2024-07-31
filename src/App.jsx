import { products as initialProducts} from   './mocks/products.json'
import { Products } from './components/Products.jsx'
import { useState } from 'react'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { useFilter } from './hooks/useFilters.js'
import { Cart } from './components/Cart.jsx'



function App() {
  const [products] = useState(initialProducts)
  const {filterProducts} = useFilter()
  const filteredProducts = filterProducts(products)

  return (
  <>

  <Header/>
  <Cart/>
  <Products products={filteredProducts} />
  <Footer/>

  </>

  )
}

export default App
