const express = require('express')

const app = express()// server start ho gaya hai 

app.use(express.json())

// notes - "title & description"

let notes = []

app.post('/notes',(req,res)=>{
    console.log(req.body);
    notes.push(req.body)
    res.json({
        message : "note added successfully"
    })
})

app.get('/notes',(req,res)=>{ 
    res.json({notes})
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})