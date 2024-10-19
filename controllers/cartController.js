// Controlador para ver el carrito
exports.viewCart = (req, res) => {
    const cart = req.session.cart || [];
    res.render('cart', { cart });
};