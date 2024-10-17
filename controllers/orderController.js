const orderService = require('../services/orderService');

// Crear una orden
exports.createOrder = async (req, res) => {
  try {
    const newOrder = await orderService.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todas las órdenes
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una orden por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una orden por ID
exports.updateOrderById = async (req, res) => {
  try {
    const order = await orderService.updateOrderById(req.params.id, req.body);
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar una orden por ID
exports.deleteOrderById = async (req, res) => {
  try {
    const order = await orderService.deleteOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    res.status(200).json({ message: 'Orden eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
