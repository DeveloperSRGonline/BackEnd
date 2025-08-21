const express = require('express');
const authUser = require('../middlewares/auth.middleware');


const router = express.Router()

router.post('/',authUser,creatChat)


module.exports = router;