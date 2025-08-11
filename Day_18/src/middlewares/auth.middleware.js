const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
  // first we read the token
  const token = req.cookies.token;

  // agar token exits nahi karta toh
  if (!token) {
    return res.status(401).json({
      message: "Unauthrized access , please login first!",
    });
  }

  // then we check ki token hamne hi create kiya tha ya ulta sidha token leke aa gaye
  try {
    // try kab chalega jab token sahi hoga
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ab decoded ke andar hamein id milegi

    const user = await userModel.findOne({
      _id: decoded.id,
    });

    // ab hamein user ki bhi toh detail forward karna padega 
    req.user = user;
    // and next ko call kar denge
    next()
  } catch (error) {
    // jab koi error hoga tab catch chalega
    return res.status(401).json({
      message: "Invalid token,please login again!",
    });
  }
  // agar token sahi hoga toh vahi data milega jo hum ne put kiya tha(means token create karte time)
}

module.exports = authMiddleware;