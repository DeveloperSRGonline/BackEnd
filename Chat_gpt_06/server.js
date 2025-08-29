// 1. Load environment variables (like DB URL, JWT secret, etc.) from the .env file
require('dotenv').config()
// 2. Import the Express app (created in src/app.js)
const app = require('./src/app')
// 3. Import the function to connect to the database (from src/db/db.js)
const connectToDB = require('./src/db/db')
// 4. Import built-in 'http' module of Node.js 
//    This helps us create a server that can work with both HTTP and WebSockets
const http = require('http')
// 5. Import the socket server setup function (from src/sockets/socket.service.js)
const initSocketServer = require('./src/sockets/socket.service')


// ---------------- MAIN SERVER CODE ----------------


// Create a server using 'http' and pass the Express app to it
const httpServer = http.createServer(app)



// First connect to MongoDB database
connectToDB()
// Then initialize the Socket.IO server (real-time communication)
initSocketServer(httpServer)




// Finally, start the server on port 3000
httpServer.listen(3000, () => {
    console.log('✅ Server is running on port 3000');
})
