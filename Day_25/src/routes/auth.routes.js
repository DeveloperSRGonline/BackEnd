const express = require("express");
const {
  getRegisterController,
  postRegisterController,
  getLoginController,
  postLoginController,
} = require("../controllers/auth.controller");

const router = express.Router();

// register route with get method
// router.get('/register',getRegisterController)
// router.post('/register',postRegisterController)
router
  .route("/register")
  .get(getRegisterController)
  .post(postRegisterController);

router.route("/login").get(getLoginController).post(postLoginController);

module.exports = router;
