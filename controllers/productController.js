const productService = require('../services/productService');

// Crear un producto
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un producto por ID
exports.updateProductById = async (req, res) => {
  try {
    const product = await productService.updateProductById(req.params.id, req.body);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un producto por ID
exports.deleteProductById = async (req, res) => {
  try {
    const product = await productService.deleteProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
