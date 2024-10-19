const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Ruta para ver el carrito
router.get('/', cartController.viewCart);
router.post('/add', cartController.addToCart);


module.exports = router;