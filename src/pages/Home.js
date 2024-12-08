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
            <section className="hero-banner">
                <div className="hero-content">
                    <h1 className="hero-title">¡Welcome!</h1>
                    <p className="hero-subtitle">Explore the latest news</p>
                    <Link to="/products" className="cta-button">See Products</Link>
                </div>
            </section>

            {/* Carrusel de productos */}
            <div id="productos" className="product-list">
                <h2>Featured Products </h2>
                <div className="carousel">
                    <button 
                        className="carousel-button prev" 
                        onClick={handlePrev} 
                        disabled={startIndex === 0} // Deshabilitar botón si no hay más a la izquierda
                    >
                        &#8592;
                    </button>
                    <div className="carousel-track">
                        {products.slice(startIndex, startIndex + productsPerPage).map((product, index) => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                isFeatured={true}  
                                className="home-product-card" 
                            />
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
