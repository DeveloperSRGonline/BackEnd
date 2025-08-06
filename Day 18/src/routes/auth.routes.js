// routes kon kon se hai yahe likhenge
const express = require("express");
const { registerController, loginController } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register",registerController); 
router.post("/login",loginController);
// api ke callback ko hi hum "Controller" bolte hai

module.exports = router; // is app.js mein use karenge authRoute ke naam se

// problem is ki ek do api ho toh koi problem nahi and if  bohat saari api ho jaye toh code ki readablity khatam ho jati hai
// jo hum callback hai use yaha directly nahi likhte use controller folder mein likhte hai koi ki yaha abhi bohat sari api aayegi toh readablity ke liye
