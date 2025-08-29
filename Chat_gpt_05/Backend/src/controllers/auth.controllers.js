const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const {
      fullName: { firstName, lastName },
      email,
      password,
    } = req.body;

    // check existing user
    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await userModel.create({
      fullName: { firstName, lastName },
      email,
      password: hashedPassword,
    });

    // generate token (check env)
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET not defined in env" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // optional
    });

    // set cookie with options
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only https in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // success response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const oldPassword = user.password;
  const ispasswordValid = await bcrypt.compare(password, oldPassword);

  if (!ispasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const generatdToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", generatdToken);

  res.status(201).json({
    message:"User logged in successfully",
    user:{
      id:user._id,
      fullName:user.fullName,
      email:user.email,
    }
  })
}

module.exports = { registerUser,loginUser };
