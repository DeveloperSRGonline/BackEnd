const mongoose = require("mongoose");

// structure of user detalis
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// model for user 
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
