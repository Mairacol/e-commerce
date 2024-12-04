import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactSelect from 'react-select';

const customStyles = {
    control: (base) => ({
        ...base,
        borderColor: '#d6b9b9',  // Usamos el color solicitado para el borde
        borderRadius: '8px',
        padding: '8px',
        fontSize: '16px',
        boxShadow: 'none',  // Para evitar el borde de enfoque por defecto
        '&:hover': {
            borderColor: '#d6b9b9',  // Mantener el color al pasar el mouse
        },
    }),
    option: (base) => ({
        ...base,
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#fff',  // Color de fondo de las opciones
        color: '#333',  // Color del texto de las opciones
        '&:hover': {
            backgroundColor: '#d6b9b9',  // Color de fondo al pasar el mouse sobre las opciones
            color: '#fff',  // Color del texto al pasar el mouse sobre las opciones
        },
    }),
    singleValue: (base) => ({
        ...base,
        color: '#333',  // Color del texto seleccionado
    }),
    placeholder: (base) => ({
        ...base,
        color: '#d6b9b9',  // Color del texto del placeholder
    }),
};

// Función para agregar productos al carrito
const addToCart = (product, selectedSize, quantity, updateCartCount) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificar si el producto con el talle seleccionado ya está en el carrito
    const productExists = cart.find(item => item.id === product.id && item.selectedSize === selectedSize);

    if (productExists) {
        // Si el producto ya está en el carrito, aumentamos la cantidad
        productExists.quantity += quantity;
    } else {
        // Si no está en el carrito, lo agregamos con la talla seleccionada y la cantidad
        cart.push({ ...product, quantity, selectedSize });
    }

    // Guardamos el carrito actualizado
    localStorage.setItem('cart', JSON.stringify(cart));

    // Calcular el total de productos en el carrito sumando las cantidades
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Actualizar el contador en App.js
    if (updateCartCount) {
        updateCartCount(totalItems);  // Pasa el total de productos al App.js
    }

    // Mostrar un mensaje de éxito
    alert('Producto agregado al carrito');
};

const ProductDetailPage = ({ updateCartCount }) => {
    const { productId } = useParams(); // Obtiene el ID del producto de la URL
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(''); // Estado para la talla seleccionada
    const [quantity, setQuantity] = useState(1); // Estado para la cantidad seleccionada
    const [sizes, setSizes] = useState([]); // Estado para almacenar las tallas disponibles

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            const data = await response.json();
            setProduct(data);

            // Si el producto es de ropa, agregamos las tallas
            if (data.category === "men's clothing" || data.category === "women's clothing") {
                setSizes(['S', 'M', 'L', 'XL']); // Tallas disponibles para ropa
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product) return <p>Cargando detalles...</p>; // Si el producto no se ha cargado, mostramos un mensaje
    const sizeOptions = sizes.map(size => ({
        value: size,
        label: size,
    }));
    return (
        <div className="product-detail">
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} width={200} />
            <p>{product.description}</p>
            <p>${product.price}</p>

            {/* Si el producto es de ropa, mostramos el selector de talle */}
            {(product.category === "men's clothing" || product.category === "women's clothing") && (
                <div>
                    <label>Talle:</label>
                    <ReactSelect
                        value={selectedSize ? { value: selectedSize, label: selectedSize } : null}
                        onChange={(selectedOption) => setSelectedSize(selectedOption.value)}
                        options={sizeOptions}
                        placeholder="Seleccionar talla"
                        styles={customStyles}
                    />
                </div>
            )}

            {/* Selector de cantidad */}
            <div className="quantity-container">
    <button className="quantity-btn" onClick={() => setQuantity(quantity - 1)}>-</button>
    <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, e.target.value))}
        min="1"
        className="quantity-input"
    />
    <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
</div>


            {/* Botón para agregar al carrito */}
            <button
                onClick={() => addToCart(product, selectedSize, quantity, updateCartCount)}
                disabled={!selectedSize && (product.category === "men's clothing" || product.category === "women's clothing")}
            >
                Añadir al carrito
            </button>
        </div>
    );
};

export default ProductDetailPage;
