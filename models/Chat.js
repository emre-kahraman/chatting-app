const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
    {
        users: {type: Array, required: true},
    }
)

module.exports = mongoose.model("chats", ChatSchema);