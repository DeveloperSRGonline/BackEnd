const express = require('express')// require to use express 
const connectToDB = require('./src/db/db')
const app = express()// creating server
connectToDB()
// server se connect yaha karenge 

// app.use(express.json())// middleware 

app.get('/',(req,res)=>{
    res.send('welcome shivam')
})

app.post('/notes',(req,res)=>{

    const { title , content } = req.body
    console.log(title,content);
})




app.listen(3000,()=>{// server start
    console.log('server is running on port');
})