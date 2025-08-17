// jo .env file ke andar create karte hai unko easily create kiy ja sakta hai
require('dotenv').config()
// use app exported from app.js
const app = require('./src/app')
const connectToDB = require('./src/db/db')

connectToDB()

// start the server 
app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
})