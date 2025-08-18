const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerUser(req,res){
    try{
    const {fullname:{firstName,lastName},email,password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        res.status(401).json('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await userModel.create({
        fullname:{
            firstName,lastName
        },
        email:email,
        password :hashedPassword
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        message:"User registered successfully",
        user:user   
    })

    }catch(err){
       console.log(err);
    }

}

async function loginUser(req,res){
    try{
        const {email,password}  = req.body;

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message:"Invalid User"
        })
    }

    const isValidPassword = await bcrypt.compare(password,user.password)
    console.log(isValidPassword);

    if(!isValidPassword){
        return res.status(400).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        message:"User logged in successfully",
        user:{
            email:user.email,
            _id:user._id,
            fullname:user.fullname
        }
    })
    }catch(err){
        console.log(err);
    }
}


module.exports = {registerUser,loginUser};  