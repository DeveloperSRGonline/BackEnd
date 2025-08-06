// api ke andar kya hoga ye chij yaha likhenge

const userModel = require("../models/user.model"); // – Mongoose model hai jo MongoDB ke users collection ko represent karta hai.
const jwt = require("jsonwebtoken"); // token ke liye jwt require kar lete hai
// npm i cookie-parser - isko bhi install kar lena token ko cookie mein save karne ke liye
const cookieParser = require("cookie-parser");
// ab hamein jwt secret ki jarurat padegi - use .env file me kis variable mein save karke use kar lena
const bcrypt = require('bcryptjs')


// register ka pura logic yaha
async function registerController(req, res) {
  const { username, password } = req.body;

  // user ko find karenge username ke basis par ki user exist karta hai ya unique hai
  const isUserAlreadyExits = await userModel.findOne({ username });

  // agar user exist karta hai toh response bhejenge
  if (isUserAlreadyExits) {
    return res.status(400).json({
      message: "User already exists.",
    });
  }
  // agar user exist nahi karta hoga tab toh hum naya user create karenge - abously ye user hi create karega
  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password,10), // jo 10 hai usko salt bolte hai
  });

  // new token create create for new user
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // token generate hone ke baad cookie ke andar token ko save kar denge
  res.cookie("token", token); // "token" is naam se line number 28 ka token save kar rahe hai

  // after successfull registeration ye message res mein bhej denge
  return res.status(201).json({
    message: "user registered successfully!",
  });
}


// login ka pura logic yaha
async function loginController(req, res) {
  const { username, password } = req.body;

  // we check ki user present hai ya nahi
  const user = await userModel.findOne({ username });

  //if user nahi milta hai
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  //if user milta hai tab password check karna hai
  // const isPasswordValid = user.password === password;
  const isPasswordValid = bcrypt.compare(password,user.password)

  // agar password barabar nahi hota hai toh
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  //if password valid toh hum token create karenge
  const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

  //token generate hone ke baad finally response send kar denge ki
  res.status(200).json({
    message:"User logged in successfully",
    user:{
      username:user.username,
      id:user._id
    }
  })
}


module.exports = {
  registerController,
  loginController,
};

//object ke form mein kyo exports kar rahe hai kyo ki yaha par ek controller nahi hota bohar sare controllers hote hai isliye
