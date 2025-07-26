const express = require("express");
const { route } = require("../app");

const router = express.Router();

router.use((req, res, next) => {
  console.log("This middleware is between router and api");
  next();
});

router.get("/", (req, res) => {
  // hamne yaha par api create kiye hai
  res.json({
    message: "Welcome to cohort",
  });
});

module.exports = router;
