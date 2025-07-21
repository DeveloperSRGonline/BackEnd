const express = require('express')// require 
const connectToDB = require('./src/db/db') // ye hamein db.js ko import kar liye 
connectToDB() // and ye call kardiye 

const app = express() // server create 

app.listen(3000,()=>{// server start
    console.log('Server is running on port 3000!');  
})