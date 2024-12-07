import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, isFeatured }) => {
    const isLongTitle = product.title.split(' ').length > 10; // Para títulos largos

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={product.image} alt={product.title} />
                <h2 className={isLongTitle ? 'overflow-title' : ''}>{product.title}</h2>
                <p>${product.price.toFixed(2)}</p>
            </Link>
        </div>
    );
};

export default ProductCard;
