const Product = require('../models/Product');

// Crear un producto
exports.createProduct = async (productData) => {
  const newProduct = new Product(productData);
  await newProduct.save();
  return newProduct;
};

// Obtener todos los productos
exports.getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

// Obtener un producto por ID
exports.getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

// Actualizar un producto por ID
exports.updateProductById = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(id, productData, { new: true, runValidators: true });
  return product;
};

// Eliminar un producto por ID
exports.deleteProductById = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  return product;
};
