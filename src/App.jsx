import { products as initialProducts} from   './mocks/products.json'
import { Products } from './components/Products.jsx'
import { useState } from 'react'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'

function useFilter(){
  const [filter, setFilter] = useState ({
    category : 'all',
    minPrice : 0,
  })


  const filterProducts = (products) => {
    return products.filter(product => {
        return ( 
          product.price >= filter.minPrice && 
          (filter.category === 'all' || product.category === filter.category)) 
  })
  }
  return {filterProducts, setFilter }
}
function App() {
  const [products] = useState(initialProducts)
  const {filterProducts,setFilter} = useFilter()
  const filteredProducts = filterProducts(products)

  return (
  <>

  <Header changeFilters={setFilter}/>
  <Products products={filteredProducts} />
  <Footer/>

  </>

  )
}

export default App
