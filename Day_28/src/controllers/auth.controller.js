<<<<<<< HEAD
// userModel require 
=======
>>>>>>> a6942f1333efaaef66b438133ce6d465941ebd5d
const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

<<<<<<< HEAD
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
=======
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
>>>>>>> a6942f1333efaaef66b438133ce6d465941ebd5d
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie('token',token)
<<<<<<< HEAD
      
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

 
=======

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
>>>>>>> a6942f1333efaaef66b438133ce6d465941ebd5d
