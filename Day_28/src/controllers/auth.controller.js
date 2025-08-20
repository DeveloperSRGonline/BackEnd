// userModel require 
const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// register controller create
async function registerUser(req,res){

    // req se kuchh chije nikalni hogi 
    const {fullName:{firstName,lastName},email,password} = req.body;

    const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist){
        res.status(400).json({
            message:"User already exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)
    

    const user = await userModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password:hashedPassword
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie('token',token)
      
    res.status(201).json({
        message:"User registered successfully",
        user:{
            email:user.email,
            _id:user._id,
            fullName:{
                firstName:user.fullName.firstName,
                lastName:user.fullName.lastName
            }
        }
    })
}

// login controller create
async function loginUser(req,res){
    const {email,password} = req.body;

    const user = await userModel.findOne({email})

    if(!user){
        res.status(401).json({
            message:"Invalid credentials"
        })
    }

    const oldPassword = user.password;
    const isPasswordValid = await bcrypt.compare(password,oldPassword)

    if(!isPasswordValid){
        res.status(401).json({
            message:"Invalid credentials"
        })
    }

    const generatedToken = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie('token',generatedToken)

    res.status(201).json({
        message:"User logged in sucessfully",
        user:{
            email:user.email,
            _id:user._id,
            fullName:user.fullName
        }
    })
}

module.exports = {registerUser,loginUser}

 