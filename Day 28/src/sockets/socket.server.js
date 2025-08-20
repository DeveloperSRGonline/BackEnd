// Import the "Server" class from socket.io library
// This will help us create a WebSocket server
const { Server } = require("socket.io");
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')


// A function that will set up (initialize) the socket server
// It takes "httpServer" (our Express/Node HTTP server) as input
function initSocketServer(httpServer) {

    // Create a new socket.io server instance and attach it to our HTTP server
    // Now the same server can handle both normal HTTP requests and WebSocket connections
    const io = new Server(httpServer, {
        // Here you can pass configuration options if needed
        // For example: { cors: { origin: "*" } } to allow all origins
    });


    // socket ka middleware
    io.use(async(socket,next)=>{
         const cookies = cookie.parse(socket.handshake.headers?.cookie || '');

         if(!cookies.token){
            next(new Error('Authentication error : no token provided'))
         }

         try {
            const decoded = jwt.verify(cookies.token,process.env.JWT_SECRET)

            const user = await userModel.findById(decoded.id)
            socket.user = user;
            next()
            
         } catch (err) {
            next(new Error('Authentication error : invalid token'))
         }

    })

    // "connection" event runs whenever a new client (browser/user) connects
    io.on('connection', (socket) => {
        socket.on('ai-message',async (messagePayload)=>{
            console.log(messagePayload)
        })
    });
}

// Export this function so it can be used in other files
// Example: server.js can call initSocketServer(httpServer)
module.exports = initSocketServer;
