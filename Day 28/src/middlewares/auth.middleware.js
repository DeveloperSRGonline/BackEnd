const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')


async function authUser(req,res,next){
    // req.cookies se token nikalenge 
    const {token} = req.cookies;

    // agar token nahi milta toh
    if(!token){
        return res.status(401).json({
            message:"Unauthrized"
        })
    }

    // agar token mil jata hai toh
    try{    
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded);

        const user = await userModel.findById(decoded.id)

        req.user = user;
    
        next();

    }catch(err){
        res.status(401).json({
            message:"Unauthorized"
        })
    }
}


module.exports = authUser;

