import React, { useEffect, useState } from 'react';
import Select from 'react-select'; // Importamos React Select
import ProductCard from '../components/ProductCard';

const ProductsPage = ({ setCartCount }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Fetch products and categories on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
            setFilteredProducts(data); // Initially show all products
        };

        const fetchCategories = async () => {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            const data = await response.json();
            // Formateamos las categorías para React Select
            const categoryOptions = [{ value: '', label: 'All' }, ...data.map(cat => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }))];
            setCategories(categoryOptions);
        };

        fetchProducts();
        fetchCategories();
    }, []);

    // Filter products when search term or category changes
    useEffect(() => {
        let filtered = products;

        // Apply category filter
        if (selectedCategory && selectedCategory.value) {
            filtered = filtered.filter(product => product.category === selectedCategory.value);
        }

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, products]);

    return (
        <div>
            {/* Search and Filters */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {/* Search Input */}
                <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
        padding: '10px',
        border: '1px solid #d6b9b9',
        borderRadius: '4px',
        width: '300px', // Ajusta el ancho según tus necesidades
    }}
/>


                {/* Category Dropdown with React Select */}
                <Select
    options={categories}
    value={selectedCategory}
    onChange={setSelectedCategory}
    placeholder="Select a category"
    styles={{
        control: (provided, state) => ({
            ...provided,
            borderRadius: '4px',
            borderColor: state.isFocused ? '#d6b9b9' : '#d6b9b9',
            padding: '2px',
            boxShadow: state.isFocused ? '0 0 0 2px #d6b9b9' : 'none',
            width: '200px', // Fijamos el ancho a 200px (puedes ajustarlo)
            '&:hover': {
                borderColor: '#d6b9b9',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#d6b9b9' : 'white',
            color: state.isFocused ? 'white' : '#333',
            '&:active': {
                backgroundColor: '#d6b9b9',
            },
        }),
    }}
/>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
                {filteredProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        updateCartCount={setCartCount} // Pasamos la función para actualizar el contador
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
