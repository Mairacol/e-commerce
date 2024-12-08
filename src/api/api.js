import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com/products';

// Obtener todos los productos
export const fetchProducts = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

// Obtener un producto por ID
export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};
