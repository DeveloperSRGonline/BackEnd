// Import mongoose (used to connect and work with MongoDB)
const mongoose = require('mongoose')

// Create a new schema (like a blueprint) for chat documents
const chatSchema = new mongoose.Schema({

    // Each chat belongs to a user (reference to a user in the 'user' collection)
    user: {
        type: mongoose.Schema.Types.ObjectId, // Special MongoDB ID type
        ref: 'user', // Refers to the "user" model (connects both collections)
        required: true // Must always have a user
    },

    // Title of the chat
    title: {
        type: String,  
        required: true  // Chat must always have a title
    },

    // Last activity date (when the chat was last used/updated)
    lastActivity: {
        type: Date,
        default: Date.now // If not provided, use the current time
    }

}, {
    // This option automatically adds createdAt and updatedAt timestamps
    timestamps: true
})

// Create a model (like a class) for chats using the schema above
// This will create a "chats" collection in MongoDB
const chatModel = mongoose.model('chat', chatSchema)

// Export the model so we can use it in other files
module.exports = chatModel
