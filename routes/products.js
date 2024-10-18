const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
//const Product = require('../models/productModel');

// Crear un producto
router.post('/', productController.createProduct);

// Obtener todos los productos
router.get('/', productController.getAllProducts);

//Con dashboard
router.get('/dashboard', async (req, res) => {
    try {
        const products = await productController.getAllProducts(req, res);       //console.log(products);
        res.render('product', { products });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Obtener un producto por ID
router.get('/:id', productController.getProductById);

// Actualizar un producto por ID
router.put('/:id', productController.updateProductById);

// Eliminar un producto por ID
router.delete('/:id', productController.deleteProductById);

module.exports = router;