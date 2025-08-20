<<<<<<< HEAD
// Import express (framework for building web servers in Node.js)
const express = require('express')
// Import cookie-parser (middleware to read cookies from requests)
const cookieParser = require('cookie-parser')


// routes
// importing the auth routes created in routes folder
const authRoutes = require('../src/routes/auth.routes')
// importing chatroutes created in routes folder
const chatRoutes = require('../src/routes/chat.routes')



// Create an Express app (server instance)
const app = express()


// using middlewares
// Middleware: parse incoming requests with JSON body
// Example: if client sends {"name":"shivam"} in body, you can access it with req.body.name
app.use(express.json())
// Middleware: parse cookies sent by the client
// Example: if client has cookies, you can access them with req.cookies
app.use(cookieParser())


// using routes
=======
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
>>>>>>> a6942f1333efaaef66b438133ce6d465941ebd5d
app.use('/api/auth',authRoutes)
app.use('/api/chat',chatRoutes)


<<<<<<< HEAD

// Export app so it can be used in server.js
// (where we import app and call app.listen to start server)
module.exports = app
=======
// export app and use it in server.js
module.exports = app;
>>>>>>> a6942f1333efaaef66b438133ce6d465941ebd5d
