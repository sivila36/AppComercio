const Product = require("../models/Product");

exports.createProduct = async (productData) => {
  const newProduct = new Product(productData);
  await newProduct.save();
  return newProduct;
};
exports.getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

exports.getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

exports.updateProductById = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });
  return product;
};

exports.deleteProductById = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  return product;
};
