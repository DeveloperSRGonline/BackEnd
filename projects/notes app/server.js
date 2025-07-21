const cors = require('cors');

const express = require('express')

const app = express()
app.use(cors());

app.use(express.json())// middleware

let notes = []
app.post('/notes',(req,res)=>{
    console.log(req.body);
    notes.push(req.body)
    res.json({
        message:"note added successfully"
    })
    // console.log(notes);
})

app.get('/notes',(req,res)=>{
    console.log("All notes:", notes);
    res.json(notes)
})


app.delete('/notes/:index',(req,res)=>{
    const index = req.params.index
    delete notes[index]
    res.json({
        message:"note deleted"
    })
})

app.patch('/notes/:index',(req,res)=>{
    const index = req.params.index
    const { title , content } = req.body

     console.log("PATCH Body:", req.body);
    notes[index].title = title
    notes[index].content = content

    res.json({
        message:"note updated",
        updatedNote: notes[index]
    })
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})