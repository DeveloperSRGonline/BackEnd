<<<<<<< HEAD
const express = require('express');
const {authUser} = require('../middlewares/auth.middleware');
const { createChat } = require('../controllers/chat.controller');


const router = express.Router();


router.post('/',authUser,createChat)
=======
const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router()


router.post('/',authMiddleware.authUser,)
>>>>>>> a6942f1333efaaef66b438133ce6d465941ebd5d



module.exports = router;