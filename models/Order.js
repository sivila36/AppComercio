var mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema ({
    quantity: { type: Number, default : 0 },
    orderId: { type: Number, default : 0 },
    clientName: { type: String, default : "" },
    totalPrice: { type: Number, default : 0 },
    date: { type: Date, default : Date.now },
    status: {
        type: String,
        enum: ["Recibido" , "Procesando", "Cancelado" , "Enviado" ],
        default: ""},
})

module.exports = mongoose.model("Order", orderSchema);