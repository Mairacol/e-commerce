import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ setCartCount }) => {
    const [cart, setCart] = useState([]);
    const [isPaid, setIsPaid] = useState(false);  // State to simulate payment
    const [loading, setLoading] = useState(false); // State to simulate payment processing
    const navigate = useNavigate();  // Hook to navigate to another page

    useEffect(() => {
        // Get cart from localStorage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Ensure all products have a valid id
        const validCart = storedCart.filter(product => product.id);
        
        setCart(validCart);
        updateCartCount(validCart);
    }, []);

    const updateCartCount = (cart) => {
        const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
        setCartCount(totalItems);  // Update the cart count in App.js
    };

    const handleRemove = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        updateCartCount(updatedCart);
    };

    const handleAddToCart = (product) => {
        const updatedCart = [...cart];
        const productIndex = updatedCart.findIndex(item => item.id === product.id);

        if (productIndex !== -1) {
            updatedCart[productIndex].quantity += 1;
        } else {
            updatedCart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        updateCartCount(updatedCart);
    };

    const getTotalPrice = () => {
        return cart.reduce((total, product) => {
            const price = product.price;
            const quantity = product.quantity || 0;
            return total + (price * quantity);
        }, 0).toFixed(2);
    };

    const handlePayment = () => {
        setLoading(true);  // Simulate payment processing
        setTimeout(() => {
            setIsPaid(true);  // Simulate successful payment
            setLoading(false);
            
            // Redirect to the products page after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }, 2000);  // Simulate processing time (2 seconds)
    };

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            <ul>
                {cart.length > 0 ? (
                    cart.map(product => (
                        <li key={product.id}>
                            <img src={product.image} alt={product.title} width={50} />
                            <span>{product.title}</span>
                            <span>${product.price.toFixed(2)} x {product.quantity}</span>
                            <button onClick={() => handleRemove(product.id)}>Remove</button>
                        </li>
                    ))
                ) : (
                    <p>No products in the cart.</p>
                )}
            </ul>
            <div>
                <h3>Total to pay: ${getTotalPrice()}</h3>
            </div>

            {/* If payment was successful, show thank you message */}
            {isPaid ? (
                <div>
                    <h3>Thank you for your purchase!</h3>
                </div>
            ) : (
                <button onClick={handlePayment} disabled={loading}>
                    {loading ? 'Processing payment...' : 'Pay'}
                </button>
            )}
        </div>
    );
};

export default CartPage;
