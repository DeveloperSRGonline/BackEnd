const express = require("express");
const authRoute = require("./routes/auth.routes");
const postRoute = require("./routes/post.routes");
const cookieParser = require("cookie-parser");
const cors = require('cors')

const app = express();
// In app.js or index.js
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json()); // middleware to read req.body

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

module.exports = app;
