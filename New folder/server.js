require('dotenv').config()
const app = require('./src/app')
const connectToDB = require('./src/db')

connectToDB()

app.listen(3000,()=>{
    console.log('server is running on port 3000!');
})