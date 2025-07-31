const express = require("express");
const authRoute = require("./routes/user.route");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json()); // middleware to read req.body
app.use("/api/auth", authRoute);

module.exports = app;
