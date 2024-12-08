import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'; 
import ProductsPage from './pages/ProductsPage'; 
import CartPage from './pages/CartPage'; 
import Home from './pages/Home'; 
import ProductDetailPage from './pages/ProductDetailPage'; 
import './styles.css';

const App = () => {
  const [cartCount, setCartCount] = useState(0); // Estado para el número de productos en el carrito

  return (
    <Router basename="/e-commerce">
      <header>
        <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>My Store</h1>
        </Link>
        <nav>
          <ul>
            {/* Enlace a los productos */}
            <li><Link to="/products" className="nav-link">Products</Link></li>
            <li>
              <Link to="/cart" className="nav-link">
                <i className="fas fa-shopping-cart"></i>
                <span className="cart-count">{cartCount}</span> 
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        {/* Redirigir de / a /home cuando se carga la página */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Página de inicio en /home */}
        <Route path="/home" element={<Home />} />

        {/* Página de productos en / */}
        <Route 
          path="/products" 
          element={<ProductsPage setCartCount={setCartCount} />} 
        />

        {/* Página del carrito */}
        <Route 
          path="/cart" 
          element={<CartPage setCartCount={setCartCount} />} 
        />

        {/* Página de detalle del producto */}
        <Route 
          path="/product/:productId" 
          element={<ProductDetailPage updateCartCount={setCartCount} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
