const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { isAdmin } = require("../middlewares/auth");
const productController = require("../controllers/productController");

// Middleware para verificar que el usuario es un administrador
router.use(isAdmin);

// Ruta para el dashboard
router.get("/dashboard", adminController.getDashboard);

/* Rutas para operaciones CRUD de usuarios
router.get("/users", adminController.getUsers);
router.get("/users/new", adminController.createUserForm);
router.post("/users", adminController.createUser);
router.get("/users/edit/:id", adminController.updateUserForm);
router.put("/users/:id", adminController.updateUser);
router.delete("/users/:id", adminController.deleteUser);*/

// Rutas para operaciones CRUD de productos
//router.get("/products", adminController.getProducts);
router.get("/products/new", adminController.newProductForm);
router.post("/products", productController.createProduct);
//router.get("/products/edit/:id", adminController.updateProductForm);
//router.put("/products/:id", adminController.updateProduct);
//router.delete("/products/:id", adminController.deleteProduct);

/* // Rutas para operaciones CRUD de órdenes
router.get("/orders", adminController.getOrders);
router.get("/orders/edit/:id", adminController.updateOrderForm);
router.put("/orders/:id", adminController.updateOrder);
router.delete("/orders/:id", adminController.deleteOrder);*/

module.exports = router;
