import { products} from   './mocks/products.json'
import { Products } from './components/Products.jsx'

function App() {
  

  return (
  <>
  
  <h1>Doflamingo Joyas</h1>

  <Products products={products} />

  </>

  )
}

export default App
