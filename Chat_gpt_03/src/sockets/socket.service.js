const { Server } = require("socket.io");
const messageModel = require('../models/message.model')
const aiService = require('../services/ai.service')
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

function initSocketServer(httpServer){

    const io = new Server(httpServer)

    io.use(async (socket,next)=>{
        const cookies = cookie.parse(socket.handshake.headers?.cookie || '')

        if(!cookies.token){
            next(new Error('Authentication error : No token provided.'))
        }

        try{
            const decoded = jwt.verify(cookies.token,process.env.JWT_SECRET)
            socket.user = await userModel.findById(decoded.id)
            next()
        }catch(error){
            next(new Error('Authentication error : Invalid token.'))
        }
    })

    io.on('connection',(socket)=>{
        socket.on("ai-message", async(messagePayload) =>{
            // console.log(messagePayload);
            
            // creating the message using data came from the frontend and saving it in db
            await messageModel.create({
                chat:messagePayload.chat,
                user:socket.user._id,
                content:messagePayload.content,
                role:"user"
            })

            // taking the chathistory from the db
            const chatHistory = (await messageModel.find({
                chat:messagePayload.chat,// using the id came with message
            }).sort({createdAt:-1}).limit(20).lean()).reverse();


            // ai ko chat history de rahe hai
            const response = await aiService.generateResponse(chatHistory.map((item)=>{
                return {
                    role:item.role,
                    parts:[{text:item.content}]
                }
            }))

            // creating model message and saving in db
            await messageModel.create({
                chat:messagePayload.chat,
                user:socket.user._id,
                content:response,
                role:"model"
            })

             // sending ai response to the frontend
            socket.emit("ai-response",{
                content:response,
                chat:messagePayload.chat
            })

        })
    })

}

module.exports = initSocketServer