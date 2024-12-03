import React, { useState, useEffect } from 'react';

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Cargar el carrito desde localStorage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const handleRemove = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    const getTotalPrice = () => {
        return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
    };

    return (
        <div className="cart">
            <h2>Carrito de Compras</h2>
            <ul>
                {cart.length > 0 ? (
                    cart.map(product => (
                        <li key={product.id}>
                            <img src={product.image} alt={product.title} width={50} />
                            <span>{product.title}</span>
                            <span>${product.price.toFixed(2)}</span>
                            <button onClick={() => handleRemove(product.id)}>Eliminar</button>
                        </li>
                    ))
                ) : (
                    <p>No hay productos en el carrito.</p>
                )}
            </ul>
            <div>
                <h3>Total: ${getTotalPrice()}</h3>
            </div>
        </div>
    );
};

export default Cart;
