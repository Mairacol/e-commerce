import React from 'react';
import { Link } from 'react-router-dom';

const addToCart = (product, updateCartCount) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productExists = cart.find(item => item.id === product.id);

    if (!productExists) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Producto agregado al carrito');
        
        // Actualizamos el contador del carrito
        if (updateCartCount) {
            updateCartCount(cart.length); // Calculamos el nuevo tamaño del carrito
        }
    } else {
        alert('Este producto ya está en el carrito');
    }
};

const ProductCard = ({ product, updateCartCount, isFeatured }) => {
    const isLongTitle = product.title.split(' ').length > 10; // Para títulos largos

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={product.image} alt={product.title} />
                <h2 className={isLongTitle ? 'overflow-title' : ''}>{product.title}</h2>
                <p>${product.price.toFixed(2)}</p>
            </Link>
            {/* Solo mostrar el botón si el producto no es destacado */}
            {!isFeatured && (
                <button onClick={() => addToCart(product, updateCartCount)}>Añadir al carrito</button>
            )}
        </div>
    );
};

export default ProductCard;
