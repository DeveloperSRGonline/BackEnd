const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')



const router = express.Router()

router.post('/register',async (req,res)=>{
    const {username,password} = req.body; 
    // async await koi ki hamein pata nahi kitna time lagega check karne ko
    // ab hum check lagayenge 
    // ye check kar rahe hai ki jis naam ka hum use bana rahe hai use naam ka username pahele se toh exist nahi karta 
    const isUserExist = await userModel.findOne({ // findone object return karta hai
        username
    }) /* if user not exist it give = null */

    if(isUserExist){ // agar same se exist karta hoga toh ye chalega
        return res.status(409).json({
            message:'Username already in use!'
        })
    }
    const user = await userModel.create({user,password})

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
})
// 41:20 - STOPPED

module.exports = router;