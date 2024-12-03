import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchProducts } from '../api/api';
import ProductCard from '../components/ProductCard';
import '../styles.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [startIndex, setStartIndex] = useState(0); // Índice inicial para el carrusel
    const productsPerPage = 4; // Número de productos visibles por fila

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };
        getProducts();
    }, []);

    // Función para avanzar en el carrusel
    const handleNext = () => {
        if (startIndex + productsPerPage < products.length) {
            setStartIndex(startIndex + productsPerPage);
        }
    };

    // Función para retroceder en el carrusel
    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - productsPerPage);
        }
    };

    return (
        <div className="home">
            {/* Banner de bienvenida */}
            <section className="hero-banner">
                <div className="hero-content">
                    <h1 className="hero-title">¡Bienvenido a nuestra tienda!</h1>
                    <p className="hero-subtitle">Explora las últimas novedades en moda</p>
                    <Link to="/" className="cta-button">Ver productos</Link>
                </div>
            </section>

            {/* Carrusel de productos */}
            <div id="productos" className="product-list">
                <h2>Productos Destacados</h2>
                <div className="carousel">
                    <button 
                        className="carousel-button prev" 
                        onClick={handlePrev} 
                        disabled={startIndex === 0} // Deshabilitar botón si no hay más a la izquierda
                    >
                        &#8592;
                    </button>
                    <div className="carousel-track">
                        {products.slice(startIndex, startIndex + productsPerPage).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <button 
                        className="carousel-button next" 
                        onClick={handleNext} 
                        disabled={startIndex + productsPerPage >= products.length} // Deshabilitar si no hay más a la derecha
                    >
                        &#8594;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
