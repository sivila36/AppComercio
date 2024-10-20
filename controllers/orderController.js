const orderService = require("../services/orderService");
const Order = require("../models/Order");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
  const { productId, quantity, price } = req.body;
  const userId = req.session.user._id;

  try {
    let cart = req.session.cart || [];
    cart = await orderService.addProductToCart(
      cart,
      productId,
      quantity,
      price
    );
    req.session.cart = cart;
    res.redirect("/cart");
  } catch (error) {
    res.status(500).send("Error adding product to cart: " + error.message);
  }
};

exports.checkout = async (req, res) => {
  const userId = req.session.user._id;
  const cart = req.session.cart || [];

  try {
    const order = await orderService.processCheckout(userId, cart);
    req.session.cart = []; // Limpiar carrito después del checkout
    res.redirect(`/orders/confirmation/${order._id}`);
  } catch (error) {
    res.status(500).send("Error processing order: " + error.message);
  }
};

exports.orderConfirmation = async (req, res) => {
  const { orderId } = req.params;

  console.log("Order ID:", orderId);

  try {
    const order = await orderService.getOrderById(orderId);

    if (!order) {
      return res.status(404).send("Order not found");
    }
    res.render("confirmation", { order });
  } catch (error) {
    res.status(500).send("Error fetching order details: " + error.message);
  }
};

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await orderService.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderById = async (req, res) => {
  try {
    const order = await orderService.updateOrderById(req.params.id, req.body);
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteOrderById = async (req, res) => {
  try {
    const order = await orderService.deleteOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });
    res.status(200).json({ message: "Orden eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
