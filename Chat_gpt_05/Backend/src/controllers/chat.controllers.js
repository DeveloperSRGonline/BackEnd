const chatModel = require('../models/chat.model');
const messageModel = require('../models/message.model');



async function createChat(req,res){
    const {title} = req.body;

    const user = req.user;

    const chat = await chatModel.create({
        user:user._id,
        title
    })

    res.status(201).json({
        message:"Chat created successfully",
        chat:{
            _id:chat._id,
            title:chat.title,
            user:chat.user,
            lastActivity:chat.lastActivity
        }
    })
}

async function getChats(req,res){
    const user = req.user;

    const chats = await chatModel.find({user:user._id})
    .sort({lastActivity:-1});

    res.status(200).json({
        message:"Chats fetched successfully",
        chats
    })
}

async function getMessages(req,res){
    const {chatId} = req.params;

    const messages = await messageModel.find({chat:chatId})
    .sort({createdAt:1});

    res.status(200).json({
        message:"Messages fetched successfully",
        messages
    })
}

async function sendMessage(req,res){
    const {chatId} = req.params;
    const {content} = req.body;

    const user = req.user;

    const message = await messageModel.create({
        chat:chatId,
        user:user._id,
        content
    });

    res.status(201).json({
        message:"Message sent successfully",
        message
    })
}

async function updateChat(req,res){
    const {chatId} = req.params;
    const {title} = req.body;

    const chat = await chatModel.findByIdAndUpdate(chatId,{
        title
    },{new:true});

    res.status(200).json({
        message:"Chat updated successfully",
        chat
    })
}

async function deleteChat(req,res){
    const {chatId} = req.params;

    const chat = await chatModel.findByIdAndDelete(chatId);

    console.log('Chat deleted successfully');
}

module.exports = {
    createChat,
    getChats,
    getMessages,
    sendMessage,
    updateChat,
    deleteChat
}