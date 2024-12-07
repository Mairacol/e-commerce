import React, { useEffect, useState } from 'react';
import Select from 'react-select'; // Importamos React Select
import ProductCard from '../components/ProductCard';
import ReactSlider from 'react-slider'; // Importamos el slider

const ProductsPage = ({ setCartCount }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [priceRange, setPriceRange] = useState([1, 1000]); // Rango de precios actualizado

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

    // Filter products when search term, category, or price range changes
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

        // Apply price filter
        filtered = filtered.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, products, priceRange]);

    return (
        <div style={{ display: 'flex' }}>
            {/* Contenedor para los productos */}
            <div style={{ flex: 1 }}>
                {/* Products Grid */}
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            updateCartCount={setCartCount}
                        />
                    ))}
                </div>
            </div>

            {/* Contenedor para los filtros, alineado a la derecha */}
            <div style={{ width: '300px', marginLeft: '20px' }}>
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
                        width: '250px',
                        marginTop: '50px' ,
                        marginRight:'15px',
                    }}
                />

                {/* Category Dropdown with React Select */}
                <Select
                    options={categories}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    placeholder="Category"
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            borderRadius: '4px',
                            borderColor: state.isFocused || state.isHovered ? '#d6b9b9' : '#d6b9b9',
                            padding: '2px',
                            boxShadow: state.isFocused ? '0 0 0 2px #d6b9b9' : 'none',
                            width: '270px',
                            marginTop: '50px',
                            marginRight:'15px',
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

                {/* Price Range Slider */}
                <div style={{ marginTop: '50px' }}>
                    <p style={{ marginBottom: '5px' }}>Price</p>
                    <ReactSlider
                        min={1}
                        max={1000}
                        step={1}
                        value={priceRange}
                        onChange={setPriceRange}
                        renderTrack={(props, state) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '8px',
                                    backgroundColor: '#E4E4E4',
                                    borderRadius: '4px',
                                }}
                            />
                        )}
                        renderTrackHighlight={(props, state) => {
                            const left = `${((state.value[0] - 1) / (1000 - 1)) * 100}%`;
                            const width = `${((state.value[1] - state.value[0]) / (1000 - 1)) * 100}%`;

                            return (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: '8px',
                                        backgroundColor: '#d6b9b9',
                                        borderRadius: '4px',
                                        position: 'absolute',
                                        left,
                                        width,
                                    }}
                                />
                            );
                        }}
                        renderThumb={(props, state) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '12px',
                                    width: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: '#333',
                                    boxShadow: '0 0 2px rgba(0,0,0,0.2)',
                                }}
                            />
                        )}
                    />

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '20px',
                            fontSize: '14px',
                            color: '#777',
                        }}
                    >
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
