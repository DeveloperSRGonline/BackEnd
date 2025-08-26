const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const {
    fullName: { firstName, lastName },
    email,
    password,
  } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(401).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password: hashedPassword,
  });

  const generatdToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", generatdToken);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
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
