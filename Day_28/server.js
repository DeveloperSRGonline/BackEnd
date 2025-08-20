// Load environment variables from .env file into process.env
// Example: process.env.MONGO_URI will be available after this
require('dotenv').config()
// Import the express app (from src/app.js)
// app contains all middleware, routes, etc.
const app = require('./src/app')
// Import the function that connects to the database (from src/db/db.js)
const connectToDB = require('./src/db/db')

const initSocketServer = require('./src/sockets/socket.server')
const httpServer = require('http').createServer(app)







// Call the function to actually connect to the database
connectToDB()
initSocketServer(httpServer)

// Start the server on port 3000
// app.listen(port, callback) → runs the server
httpServer.listen(3000, () => {
    // This message will show in terminal once the server is up and ready
    console.log('Server is running on port 3000');
})

// The callback (arrow function) runs after the server starts
// It confirms the server is ready to accept requests (GET, POST, etc.)
