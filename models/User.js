var mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema ({
    name: { type: String, default : "" },
    email: { type: String, default : "" },
    password: { type: String, default : "" },
})

module.exports = mongoose.model("User", userSchema);