const express = require("express")
const connectTODB = require('./src/db/db')
const { applyDefaults } = require("./src/models/note.model")
const noteModel = require('./src/models/note.model')
connectTODB()

const app = express()
app.use(express.json())// middleware

app.post('/notes',async (req,res)=>{
    const {title,content} = req.body
    // console.log(title , content)

    await noteModel.create({
        title,
        content
    })
    res.json({
        message:"Note created successfully!"
    })
})

app.delete('/notes/:id',async (req,res)=>{
    const noteID = req.params.id
    await noteModel.findOneAndDelete({
        _id : noteID
    })
    
    res.json({
        message : "note deleted successfully!"
    })
})

app.patch('/notes/:id',async (req,res)=>{
    const noteID = req.params.id
    const {title} = req.body
    await noteModel.findOneAndUpdate({
        _id : noteID
        
    },{
        title : title
    })
    
    res.json({
        message:"Note updated successfully!"
    })
    
})

app.get('/notes',async (req,res)=>{
    const notes = await noteModel.find()
    res.json({
        message : 'note fetch successfully!',
        notes
    })
})

app.listen(3000,()=>{
        console.log("Server is running no port 3000");
    })