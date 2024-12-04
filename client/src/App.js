import React, { useState }  from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage'; // Página de productos
import CartPage from './pages/CartPage'; // Página del carrito
import Home from './pages/Home'; // Página home '
import './styles.css';

const App = () => {
  const [cartCount, setCartCount] = useState(0); // Estado para el número de productos en el carrito

    return (
        <Router>
            <header>
                <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h1>Mi Tienda</h1>
                </Link>
                <nav>
                <ul>
    <li><Link to="/" className="nav-link">Productos</Link></li>
    <li>
        <Link to="/cart" className="nav-link">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">{cartCount}</span> {/* Ejemplo con 3 productos */}
        </Link>
    </li>
</ul>

                </nav>
            </header>
            <Routes>
            <Route 
                  path="/" 
                  element={<ProductsPage setCartCount={setCartCount} />} // Pasa setCartCount
              />
              <Route 
                  path="/cart" 
                  element={<CartPage setCartCount={setCartCount} />} // Pasa setCartCount también a CartPage
              />
              <Route path="/home" element={<Home />} />
                
            </Routes>
        </Router>
    );
};

export default App;
