import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const ProductsPage = ({ setCartCount }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <div className="products-grid">
            {products.map(product => (
                <ProductCard 
                key={product.id} 
                product={product} 
                updateCartCount={setCartCount} // Pasamos la función para actualizar el contador
            />
            ))}
        </div>
    );
};

export default ProductsPage;
