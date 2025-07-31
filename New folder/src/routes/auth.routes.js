const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  // register karte time ye route path hit hoga
  const { username, password } = req.body;
  // async await koi ki hamein pata nahi kitna time lagega check karne ko
  // ab hum check lagayenge
  // ye check kar rahe hai ki jis naam ka hum use bana rahe hai use naam ka username pahele se toh exist nahi karta
  const isUserExist = await userModel.findOne({
    // findone object return karta hai
    username,
  }); /* if user not exist it give = null */

  if (isUserExist) {
    // agar same se exist karta hoga toh ye chalega
    return res.status(409).json({
      message: "Username already in use!",
    });
  }
  const user = await userModel.create({ username, password });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token); // 'token' jaruri nahi ki tum ye hi naam likho tum kuchh bhi naam rakh sakte ho
  res.status(201).json({
    message: "User registered successfully!",
    user,
  });
});

router.get("/user", async (req, res) => {
  // profile ke data ke liye ye route path hit hoga
  const token = req.cookies.token; // cookies.jobhinaam se save kiye ho us naam ko likhna padega

  if (!token) {
    return res.status(401).json({
      message: "Unautharized , token not found!",
    });
  }

  // ab hamein token ko varify karna padega

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ye check karta hai ji user ka vahi hai jo maine create kiya tha ya dusra hai is hai toh yr decoded mein data return karta hai jo hamne banate waqt use kiya tha

    // console.log(decoded);  - decoded object return kare if all thing right and us object me id bhi hogi
    const user = await userModel.findOne({
      _id: decoded.id, // mongodb use _id as a id
    });

    return res.status(200).json({
      message: "user fetched successfully!",
      user,
    });
  } catch (err) {
    // error tab aayega jab aap aise token ko varify karne ki kosish kar rahe ho jo aap ke server ne create kiya hi nahi - yane vo token galat hai
    res.status(401).json({
      message: "Unauthorized invalid token!",
    });
  }
});

// "/user" - api kab hit hogi jab tumhe userProfile pe jana ho - yane jo profile ka data server pe save hoga use hum pana chahte hai vo data /user route path pe aayega

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // ab check karte hai
  const user = await userModel.findOne({
    // ab user milega ya nahi milega
    username,
  });

  //if user nahi milega
  if (!user) {
    return res.status(404).json({
      message: "user account not found",
    });
  }
  // agar use mila toh
  const isPasswordValid = user.password === password;

  //agar password sahi nahi nikla toh
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  // agar username and password sahi hai tab
  const token = jwt.sign({ id: user._id },process.env.JWT_SECRET);

  res.cookie("token", token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  res.status(200).json({
    message:'user logged in successfully',
    user
  })

});

router.get('/logout',(req,res)=>{
    res.clearCookie('token') // token clear kar denge 

    res.status(200).json({ // response kar denge
      message:'user logged out successfully'
    })
})




module.exports = router;