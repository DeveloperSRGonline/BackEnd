require('dotenv').config()
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require('./src/service/ai.service')

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("A user connected!");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on('ai-message',async (data)=>{
    const response = await generateResponse(data.prompt)
    console.log('AI Response : ',response);
  })
});

httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
