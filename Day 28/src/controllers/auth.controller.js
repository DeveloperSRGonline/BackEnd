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
    res.status(401).json({
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

  const generatedToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", generatedToken);

  res.status(201).json({
    message: "User created successfully",
    user: {
      email: user.email,
      fullName: {
        firstName: user.fullName.firstName,
        lastName: user.fullName.lastName,
      },
    },
  });
}


async function loginUser(req,res){
  const {email,password} = req.body;

  const user = await userModel.findOne({email})

  if(!user){
    res.status(401).json({
      message:"Email or password is wrong"
    })
  }

  const oldPassword = user.password;

  const isPasswordValid = bcrypt.compare(password,oldPassword)

  if(!isPasswordValid){
    res.status(401).json({
      message:"Email or password is wrong"
    })
  }

  const generatedToken = jwt.sign({id:user._id},process.env.JWT_SECRET)

  res.cookie('token',generatedToken)

  res.status(201).json({
    message:"User logged in successfully",
    user:{
      email:user.email,
      fullName:{
        firstName:user.fullName.firstName,
        lastName:user.fullName.lastName
      }
    }
  })

}

module.exports = { registerUser,loginUser };
