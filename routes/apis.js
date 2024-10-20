const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const productController = require("../controllers/productController");
const userController = require("../controllers/userController");
const orderController = require("../controllers/orderController");

router.get("/users", userController.getAllUsers);
router.get("/products", productController.getAllProducts);
router.get("/orders", orderController.getAllOrders);

module.exports = router;
