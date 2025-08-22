// Load environment variables from .env file into process.env
require('dotenv').config()
// Import the Express app from src/app.js
const app = require('./src/app')
// Import the database connection function from src/db/db.js
const connectToDB = require('./src/db/db')
// Import the socket server initializer from src/sockets/socket.server.js
const initSocketServer = require('./src/sockets/socket.server')



// Create an HTTP server using the Express app
// (this is needed because sockets work directly with HTTP server)
const httpServer = require('http').createServer(app)

// Connect to MongoDB database
connectToDB()

// Initialize the socket server and attach it to our HTTP server
initSocketServer(httpServer)

// Start the HTTP server on port 3000
httpServer.listen(3000, () => {
    console.log('Server is running on port 3000')
})
