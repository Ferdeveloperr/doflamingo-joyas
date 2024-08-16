import { products as initialProducts} from   './mocks/products.json'
import { Products } from './components/Products.jsx'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { useFilter } from './hooks/useFilters.js'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/Cart.jsx'
import { Aside} from './components/Aside.jsx'
import './components/global.css'
import SimpleParallax from 'simple-parallax-js'
import './components/parallax.css'





function App() {
  const { filterProducts } = useFilter();
  const filteredProducts = filterProducts(initialProducts);
 

  return (
    <CartProvider>
      <Header />
      <div className="flex">
        <Aside />
        <div className="flex-1">
          <Cart />
          <Products products={filteredProducts} />
        </div>
      </div>
      <div>
      <SimpleParallax delay={0.5} scale={1.2}  transition="cubic-bezier(0,0,0,1)" translateY="100px" >
          <img src="./public/bannerOcho.png" alt="image" />
          
      </SimpleParallax>
      </div>
  
      <Footer />
    </CartProvider>
  );
}

export default App;


