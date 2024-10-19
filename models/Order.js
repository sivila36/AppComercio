var mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema ({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
    totalPrice: { type: Number, required: true},
    createdAt: { type: Date, default : Date.now },
    status: {
        type: String,
        enum: ["Recibido" , "Procesando", "Cancelado" , "Enviado" ],
        default: ""},
})

module.exports = mongoose.model("Order", orderSchema);