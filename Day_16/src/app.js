const express = require("express");
const authRoute = require("./routes/auth.route");
const postRoute = require('./routes/post.route')
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json()); // middleware to read req.body

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

module.exports = app;
