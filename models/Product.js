var mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema ({
    name: { type: String, default : "" },
    category: { 
        type: String,
        enum : ["Perifericos", "Almacenamiento" , "Procesadores", "Fuentes", "Equipos"], 
        default : "" },
    price: { type: Number, default : 0 },
    stock: { type: Number, default : 0 },
})

module.exports = mongoose.model("Product", productSchema);
