const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
    {
        sender: {type: String, required: true},
        conversation: {type: String, required: true},
        text: {type: String, required: true},
    },
    {timestamps: true}
)

module.exports = mongoose.model("messages", MessageSchema);