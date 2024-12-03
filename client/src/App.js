import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage'; // Página de productos
import CartPage from './pages/CartPage'; // Página del carrito
import Home from './pages/Home'; // Página home '
import './styles.css';

const App = () => {
    return (
        <Router>
            <header>
                <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h1>Mi Tienda</h1>
                </Link>
                <nav>
                <ul>
    <li><Link to="/" className="nav-link">Productos</Link></li>
    <li><Link to="/cart" className="nav-link">Carrito</Link></li>
</ul>

                </nav>
            </header>
            <Routes>
                <Route path="/" element={<ProductsPage />} /> {/* Página de productos */}
                <Route path="/cart" element={<CartPage />} /> {/* Página del carrito */}
                <Route path="/home" element={<Home />} /> {/* Página home */}
            </Routes>
        </Router>
    );
};

export default App;
