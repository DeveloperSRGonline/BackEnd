const mongoose = require('mongoose')

// async function means this function will handle asynchronous operations
// (like connecting to a database, which takes some time).
async function connectToDB() {
    try {
        // Try to connect to MongoDB using mongoose.
        // process.env.MONGO_URI will hold the connection string (stored in .env file for safety).
        // await makes JavaScript wait until the database connection is successful or fails.
        await mongoose.connect(process.env.MONGO_URI)

        // If the connection is successful, this message will be printed in the terminal.
        console.log("Connected to DB");
    } catch (err) {
        // If there is any error while connecting, this code will run.
        // For example: wrong connection string, MongoDB not running, etc.
        console.log("Error connecting to DB",err);
    }
}

//finally export connectToDB function and use it in server.js
module.exports = connectToDB;