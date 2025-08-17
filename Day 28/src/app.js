// express require
const express = require('express')
// require cookie-parser
const cookieParser = require('cookie-parser')

// using routes
const authRoutes = require('./routes/auth.routes')
const chatRoutes = require('./routes/chat.routes')

// save express all power in app (server instance)
const app = express()


// middleware use 
app.use(express.json())
app.use(cookieParser())

//routes using
app.use('/api/auth',authRoutes)
app.use('/api/chat',chatRoutes)


// export app and use it in server.js
module.exports = app;