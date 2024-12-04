import React, { useState, useEffect } from 'react';

const CartPage = ({ setCartCount }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Obtener carrito desde localStorage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Asegurarse de que todos los productos tengan un id válido
        const validCart = storedCart.filter(product => product.id);
        
        setCart(validCart);
        updateCartCount(validCart);
    }, []);

    const updateCartCount = (cart) => {
        // Calcular el total de productos en el carrito (incluyendo la cantidad de cada uno)
        const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
        setCartCount(totalItems);  // Actualizar el contador en el App.js
    };

    const handleRemove = (id) => {
        console.log("Eliminando producto con id:", id);  // Verificar que el id sea correcto

        const updatedCart = cart.filter(item => item.id !== id);

        // Verifica si el producto fue realmente eliminado
        console.log("Carrito después de eliminar el producto:", updatedCart);

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        
        // Actualizar el estado del carrito
        setCart(updatedCart);
        
        // Actualizar el contador del carrito
        updateCartCount(updatedCart);
    };

    const handleAddToCart = (product) => {
        const updatedCart = [...cart];
        const productIndex = updatedCart.findIndex(item => item.id === product.id);

        if (productIndex !== -1) {
            // Si el producto ya está en el carrito, incrementa la cantidad
            updatedCart[productIndex].quantity += 1;
        } else {
            // Si el producto no está, agrégalo con cantidad 1
            updatedCart.push({ ...product, quantity: 1 });
        }

        // Actualizar el carrito en el estado y en localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        updateCartCount(updatedCart);  // Actualizar el contador después de agregar un producto
    };

    const getTotalPrice = () => {
        return cart.reduce((total, product) => {
            const price = product.price; // `product.price` ya es un número
            const quantity = product.quantity || 0; // Asegura que la cantidad esté definida
            return total + (price * quantity);
        }, 0).toFixed(2);
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
                            <span>${product.price.toFixed(2)} x {product.quantity}</span>
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

export default CartPage;
