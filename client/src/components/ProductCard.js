import React from 'react';

const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verifica si el producto ya está en el carrito
    const productExists = cart.find(item => item.id === product.id);
    
    if (!productExists) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Producto agregado al carrito');
    } else {
        alert('Este producto ya está en el carrito');
    }
};

const ProductCard = ({ product }) => {
    const isLongTitle = product.title.split(' ').length > 10; // Para títulos largos

    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} />
            <h2 className={isLongTitle ? 'overflow-title' : ''}>{product.title}</h2>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Añadir al carrito</button>
        </div>
    );
};

export default ProductCard;