const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        token: {type: String},
        online: {type: Boolean, default: false},
        friendlist: {type: Array, default: []}
    }
)

module.exports = mongoose.model("user", UserSchema);