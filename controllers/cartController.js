const orderService = require("../services/orderService");

exports.viewCart = (req, res) => {
  const cart = req.session.cart || [];
  res.render("cart", { cart });
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.session.user._id;
  console.log("productId:", productId);
  console.log("quantity:", quantity);

  try {
    let cart = req.session.cart || [];
    cart = await orderService.addProductToCart(cart, productId, quantity);
    req.session.cart = cart;
    res.json({ success: true, cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error agregando producto al carrito: " + error.message,
    });
  }
};
