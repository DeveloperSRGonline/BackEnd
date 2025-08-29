const express = require('express')
const authUser = require('../middlewares/auth.middleware')
const chatController = require('../controllers/chat.controllers')


const router = express.Router()

router.post('/',authUser,chatController.createChat)
router.get('/', authUser, chatController.getChats)

router.post('/messages/:chatId', authUser, chatController.sendMessage)
router.get('/messages/:chatId', authUser, chatController.getMessages)


module.exports = router