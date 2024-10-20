const Product = require("../models/Product");
const productService = require("../services/productService");
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
    return products;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  const { category, name } = req.query;
  let filter = {};
  if (category) filter.category = category;
  if (name) filter.name = new RegExp(name, "i");
  try {
    const products = await Product.find(filter);
    res.render("products", { products });
  } catch (error) {
    res.status(500).send("Error fetching products");
    console.log(error);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const product = await productService.updateProductById(
      req.params.id,
      req.body
    );
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const product = await productService.deleteProductById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
