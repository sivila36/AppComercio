const Order = require('../models/Order');

// Crear una orden
exports.createOrder = async (orderData) => {
  const newOrder = new Order(orderData);
  await newOrder.save();
  return newOrder;
};

// Obtener todas las órdenes
exports.getAllOrders = async () => {
  const orders = await Order.find();
  return orders;
};

// Obtener una orden por ID
exports.getOrderById = async (id) => {
  const order = await Order.findById(id);
  return order;
};

// Actualizar una orden por ID
exports.updateOrderById = async (id, orderData) => {
  const order = await Order.findByIdAndUpdate(id, orderData, { new: true, runValidators: true });
  return order;
};

// Eliminar una orden por ID
exports.deleteOrderById = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  return order;
};
