var mongoose = require("mongoose");
const { r } = require("tar");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "client"], default: "client" },
});

module.exports = mongoose.model("User", userSchema);
