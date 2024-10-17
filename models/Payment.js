var mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var paymentSchema = new Schema ({
    paymentType: { 
        type: String, 
        enum : ["Debito", "Transferencia" , "Credito"], 
        default : "" },
    id: { type: Number, default : 0 },
    total: { type: Number, default : 0 },
    date: { type: Date, default : Date.now },
    status: { 
        type: String, 
        enum : ["Aprobado", "En Proceso" , "Rechazado"], 
        default : "" },
})

module.exports = mongoose.model("Payment", paymentSchema);