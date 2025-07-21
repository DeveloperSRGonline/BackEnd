const express = require('express')// express create for use 


const app = express() // server create ho gaya 

app.use(express.json())

let notes = []

app.get('/',(req,res)=>{
    res.send('Hello shivam')
})

// POST /notes -> {title , content}

app.post('/notes',(req,res)=>{
    console.log(req.body);
    notes.push(req.body)

    res.json({
        message : "note added successfully",
        notes : notes
    })
})

app.delete('/notes/:index',(req,res)=>{
    const index = req.params.index
    delete notes[index]
    res.json({
        message:"note deleted successfully"
    })
})

app.patch('/notes/:index',(req,res)=>{
    const index = req.params.index
    const { title } = req.body

    notes[index].title = title
    res.json({
        message:"notes updated successfully!"
    })
})

app.get('/notes',(req,res)=>{
     res.json(notes);
})

app.listen(3000,()=>{
    console.log('server is started!');
})


