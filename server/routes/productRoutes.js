const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET: Obtener todos los productos
router.get('/', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

// POST: Crear un nuevo producto
router.post('/', async (req, res) => {
    const { name, price, description, image } = req.body;
    const newProduct = await Product.create({ name, price, description, image });
    res.json(newProduct);
});

module.exports = router;
