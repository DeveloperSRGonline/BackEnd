const express = require('express')
const authUser = require('../middlewares/auth.middleware')
const chatController = require('../controllers/chat.controllers')


const router = express.Router()

router.post('/',authUser,chatController.createChat)
router.get('/', authUser, chatController.getChats)
router.put('/:chatId', authUser, chatController.updateChat)
router.delete('/:chatId', authUser, chatController.deleteChat)

router.post('/messages/:chatId', authUser, chatController.sendMessage)
router.get('/messages/:chatId', authUser, chatController.getMessages)


module.exports = router