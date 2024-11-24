const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { isAdmin } = require("../middlewares/auth");
const productController = require("../controllers/productController");

// Middleware para verificar que el usuario es un administrador
router.use(isAdmin);

// Ruta para el dashboard
router.get("/dashboard", adminController.getDashboard);

router.get("/products/new", adminController.newProductForm);
router.post("/products", productController.createProduct);

module.exports = router;
