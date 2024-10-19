const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/cart/add', orderController.addToCart);
router.post('/checkout', orderController.checkout);
//router.get('/checkout', orderController.checkout);
router.get('/order/confirmation/:orderId', orderController.orderConfirmation);



// Crear una orden
router.post('/', orderController.createOrder);

// Obtener todas las órdenes
router.get('/', orderController.getAllOrders);

// Obtener una orden por ID
router.get('/:id', orderController.getOrderById);

// Actualizar una orden por ID
router.put('/:id', orderController.updateOrderById);

// Eliminar una orden por ID
router.delete('/:id', orderController.deleteOrderById);

module.exports = router;
