const express = require("express");
const app = express();
const userRoute = require("./routers/user.js");
const messageRoute = require("./routers/message.js");
const chatRoute = require("./routers/chat.js");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO);

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use("/api/chat", chatRoute);
app.listen(5000);