const express = require('express');
const { getRegisterController } = require('../controllers/auth.controller');

const router = express.Router()

// register route with get method
router.get('/register',getRegisterController)

module.exports = router;