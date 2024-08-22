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
import {Login} from './components/Login.jsx'
import {Register} from './components/Register.jsx'
import {ForgotPassword} from './components/ForgotPassword.jsx'
import ResetPassword from './components/ResetPassword.jsx';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';







function App() {
  const { filterProducts } = useFilter();
  const filteredProducts = filterProducts(initialProducts);

 

  return (
    
    <CartProvider>
    <Router>
    <Header />
      <Routes>
      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
    
      
      <div className="flex">
        <Aside />
        <div className="flex-1">
          <Cart />
          <Products products={filteredProducts} />
        </div>
      </div>
      <div>
      <SimpleParallax delay={0.9} scale={1.2}  transition="cubic-bezier(0,0,0,1)" translateY="100vh" translateZ="30vh" overlay="rgba(0,0,0,5)" >
          <img src="./public/bannerOcho.png" alt="image" className='h-100' />
          
      </SimpleParallax>
      </div>
  
      <Footer />
    </CartProvider>
  );
}

export default App;


