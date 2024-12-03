import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Importa Link

import { fetchProducts } from '../api/api';
import ProductCard from '../components/ProductCard';
import '../styles.css'; 


const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };
        getProducts();
    }, []);
    console.log("Renderizando Home");

    return (
        <div>
            {/* Banner de bienvenida */}
            <section className="hero-banner">
    <div className="hero-content">
        <h1 className="hero-title">¡Bienvenido a nuestra tienda!</h1>
        <p className="hero-subtitle">Explora las últimas novedades en moda</p>
        <Link to="/" className="cta-button">Ver productos</Link> {/* Link para redirigir a productos */}
    </div>
</section>


            {/* Sección de productos */}
            <div id="productos" className="product-list">
                <h2>Productos Destacados</h2>
                <div className="productos-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
