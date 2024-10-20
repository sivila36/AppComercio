const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/", productController.createProduct);

router.get("/", productController.getProducts);

router.get("/dashboard", async (req, res) => {
  try {
    const products = await productController.getAllProducts(req, res);
    res.render("product", { products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", productController.getProductById);

router.put("/:id", productController.updateProductById);

router.delete("/:id", productController.deleteProductById);

module.exports = router;
