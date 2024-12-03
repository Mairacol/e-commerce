import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage'; // Página de productos
import CartPage from './pages/CartPage'; // Página del carrito
import './styles.css';

const App = () => {
    return (
        <Router>
            <header>
                <h1>Mi Tienda</h1>
                <nav>
                    <ul>
                        <li><a href="/">Productos</a></li>
                        <li><a href="/cart">Carrito</a></li>
                    </ul>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<ProductsPage />} /> {/* Página de productos */}
                <Route path="/cart" element={<CartPage />} /> {/* Página del carrito */}
            </Routes>
        </Router>
    );
};

export default App;
