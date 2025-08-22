const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function registerUser(req,res){
    const {fullName:{firstName,lastName},email,password} = req.body


    const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist){
        return res.status(401).json({
            message:"User already exists"
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

    const generatedToken = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie('token',generatedToken)

    res.status(201).json({
        message:"User registered successfully",
        user:{
            fullName:{
                firstName:user.fullName.firstName,
                lastName:user.fullName.lastName
            },
            email:user.email,
            _id:user._id
        }
    })

}


async function loginUser(req,res){
    const {email,password} = req.body;

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(401).json({
            message:"Invalid username or password"
        })
    }

    const oldPassword = user.password

    const isPasswordValid = await bcrypt.compare(password ,oldPassword)

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid username or password"
        })
    }

    const generatedToken = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie('token',generatedToken)

    res.status(201).json({
        message:"User logged in successfully",
        user:{
            fullName:{
                firstName:user.fullName.firstName,
                lastName:user.fullName.lastName
            },
            email:user.email,
            _id:user._id
        }
    })
}


module.exports = {registerUser,loginUser};