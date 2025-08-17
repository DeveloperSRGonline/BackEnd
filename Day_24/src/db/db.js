const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connected to DB!"))
    .catch((err) => console.error("MongoDB connection error : ", err));
}

module.exports = connectToDB;
