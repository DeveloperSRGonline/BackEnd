const express = require('express')
const cookieParser = require('cookie-parser')
const autoRoute = require('./routes/auth.routes')


const app = express()
app.use(express.json())
/**
 * Middleware to parse incoming JSON requests.
 * This middleware is used between the Express app and route handlers
 * to automatically parse JSON payloads in the request body.
 */
app.use(cookieParser())
app.use('/auth',autoRoute)



module.exports = app;