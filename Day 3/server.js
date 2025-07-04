const express = require('express')// require 


const app = express()// create server    

// lets program the server 
// /home => welcome to home page


app.listen(3000,()=>{// start the server
    console.log('Server is running on port 3000');
})