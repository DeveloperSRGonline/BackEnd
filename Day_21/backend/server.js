require("dotenv").config();
const app = require("src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./service/ai.service");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const chatHistory = [];

io.on("connection", (socket) => {
  console.log("A user connected!");

  socket.on("disconnect", () => {
    console.log("A user disconnected!");
  });

  socket.on("ai-message", async (data) => {
    console.log("Ai message recived : ", data);

    // use ke ques pushing in chatHistory
    chatHistory.push({
      role: "user",
      parts: [{ text: data }],
    });

    // ai se base on chat history response mang rahe hai
    const AIResponse = await generateResponse(chatHistory);

    // ai ke response ko bhi chat history mein save kar rahe hai
    chatHistory.push({
      role: "model",
      parts: [{ text: AIResponse }],
    });
    console.log("AI response : ", AIResponse);
    // jo listner postman pe laga hai vaha hum server se fire kar rahe airesponse ko
    socket.emit("ai-message-response", AIResponse);
  });
});

httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
