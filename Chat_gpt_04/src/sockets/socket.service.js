const { Server } = require("socket.io");
const messageModel = require('../models/message.model')
const aiService = require('../services/ai.service')
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const {createMemory,queryMemory} = require('../services/vector.service')

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
            
            // user ne jo message kiya hai use database mein save karenge
            const message = await messageModel.create({
                chat:messagePayload.chat,
                user:socket.user._id,
                content:messagePayload.content,
                role:"user"
            })
            
            // user ke message ko vector mein convert karnege with gemini embading model(for long term memory)
            const vectors = await aiService.generateVector(messagePayload.content)
            

            const memory =  await queryMemory({
                queryVector:vectors,
                limit:3,
                metadata:{}
            })

            // vector ko vector database mein save kar rahe hai
            await createMemory({
                vectors,
                messageId:message._id,// message ki same id vector ko 
                metadata:{ // data ki aur kya kya property hai
                    chat:messagePayload.chat,// is chat se belong karta hai
                    user:socket.user._id,// is user ka message hai
                    text:messagePayload.content // message ka text 
                }
            })

            // short term memory using mongodb data
            const chatHistory = (await messageModel.find({
                chat:messagePayload.chat,// using the id came with message
            }).sort({createdAt:-1}).limit(20).lean()).reverse();


            // feeding short term memory to the ai using that ai gives response
            const response = await aiService.generateResponse(chatHistory.map((item)=>{
                return {
                    role:item.role,
                    parts:[{text:item.content}]
                }
            }))

            // ai jo bhi message karega use mongodb mein save karenge
            const responseMessage = await messageModel.create({
                chat:messagePayload.chat,
                user:socket.user._id,
                content:response,
                role:"model"
            })

            // ai generated message ko again vector mein convert using gemini vector generator
            const responseVectors = await aiService.generateVector(response)

            // saving that ai response vector in vector database
            await createMemory({
                vectors:responseVectors,
                messageId:responseMessage._id,
                metadata:{
                    chat:messagePayload.chat,
                    user:socket.user._id,
                    text:response
                }
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