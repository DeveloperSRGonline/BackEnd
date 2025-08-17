const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
  // token nikalenge cookies se
  const token = req.cookies.token;

  // if token nahi hai
  if (!token) {
    return res.redirect('/login')
  }

  try{

    // token ko verify ki sahi hai kya nahi
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
    // decoded ke andar id mil jayegi user ki us ke basis par user ko find karenge
    const user = await userModel.findById(decoded.id) 

    // req ke andar user ko set kar denge
    req.user = user;

    // then finally next ko call karenge
  }catch(err){
    // agar verify karte time kuchh error aayega toh to catch ke andar aa jayega
    res.status(401).json({
        message:"Invalid token"
    })
  }
}


module.exports = {authUser}