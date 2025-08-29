const { Server } = require("socket.io");
const messageModel = require("../models/message.model");
const aiService = require("../services/ai.service");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { createMemory, queryMemory } = require("../services/vector.service");

function initSocketServer(httpServer) {
  const io = new Server(httpServer);

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

    if (!cookies.token) {
      next(new Error("Authentication error : No token provided."));
    }

    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
      socket.user = await userModel.findById(decoded.id);
      next();
      // console.log('connected to socket server');
    } catch (error) {
      next(new Error("Authentication error : Invalid token."));
    }
  });

  io.on("connection", (socket) => {
    // console.log('user connected');
    socket.on("ai-message", async (messagePayload) => {
      // user message saving in mongoDB , vector generating of that user message using ai and vector saving in pinecone vector DB
      const [message, vectors] = await Promise.all([
        messageModel.create({
          chat: messagePayload.chat,
          user: socket.user._id,
          content: messagePayload.content,
          role: "user",
        }),
        aiService.generateVector(messagePayload.content),
      ]);
      await createMemory({
        vectors,
        messageId: message._id, // message ki same id vector ko
        metadata: {
          // data ki aur kya kya property hai
          chat: messagePayload.chat, // is chat se belong karta hai
          user: socket.user._id, // is user ka message hai
          text: messagePayload.content, // message ka text
        },
      });

      // query in vector DB (pinecone) and query in mongoDB
      const [memory, chatHistory] = await Promise.all([
        queryMemory({
          queryVector: vectors,
          limit: 3,
          metadata: {},
        }),
        messageModel
          .find({
            chat: messagePayload.chat, // using the id came with message
          })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean()
          .then((messages) => messages.reverse()),
      ]);

      const stm = chatHistory.map((item) => {
        return {
          role: item.role,
          parts: [{ text: item.content }],
        };
      });

      const ltm = [
        {
          role: "user",
          parts: [
            {
              text: `

                        these are some previous messages from the chat, use them to generate a response

                        ${memory.map((item) => item.metadata.text).join("\n")}
                        
                        `,
            },
          ],
        },
      ];

      const response = await aiService.generateResponse([...ltm, ...stm]);
      // sending ai response to the frontend
      socket.emit("ai-response", {
        content: response,
        chat: messagePayload.chat,
      });

      const [responseMessage, responseVectors] = await Promise.all([
        messageModel.create({
          chat: messagePayload.chat,
          user: socket.user._id,
          content: response,
          role: "model",
        }),
        aiService.generateVector(response),
      ]);

      await createMemory({
        vectors: responseVectors,
        messageId: responseMessage._id,
        metadata: {
          chat: messagePayload.chat,
          user: socket.user._id,
          text: response,
        },
      });
    });
  });
}

module.exports = initSocketServer;
