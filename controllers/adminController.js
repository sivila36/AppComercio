const UserService = require("../services/userService");
const ProductService = require("../services/productService");
const OrderService = require("../services/orderService");

exports.getDashboard = async (req, res) => {
  const users = await UserService.getAllUsers();
  const products = await ProductService.getAllProducts();
  const orders = await OrderService.getAllOrders();

  res.render("adminDashboard", { users, products, orders });
};

exports.newProductForm = async (req, res) => {
  res.render("addProduct");
};
