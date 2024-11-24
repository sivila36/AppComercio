var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: { type: String, default: "" },
  description: { type: String },
  category: {
    type: String,
    enum: [
      "Perifericos",
      "Almacenamiento",
      "Procesadores",
      "Fuentes",
      "Equipos",
    ],
  },
  price: {
    type: Number,
    default: 0,
    validate: {
      validator: function (value) {
        return value >= 0; // Valida que el precio no sea negativo
      },
      message: "El precio no puede ser negativo",
    },
  },
  stock: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", productSchema);
