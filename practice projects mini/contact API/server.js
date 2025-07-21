const express = require('express')

const app = express()
app.use(express.json())

let contacts = [
    {
        id:1,
        name:"Raju",
        phone:"3924752047"
    },
    {
        id:2,
        name:"shyam",
        phone:"2323343564"
    }
]

app.get('/',(req,res)=>{
    res.json('Welcome to contacts mini API')
})

app.post('/contacts',(req,res)=>{
    const { name , phone } = req.body

    if(!name || !phone){
        return res.status(404).json({message:"Name and phone is required"})
    }

    const newContact = {
        id : contacts.length + 1,
        name,
        phone
    }

    contacts.push(newContact)
    res.status(201).json(newContact)
})

app.patch('/contacts/:id',(req,res)=>{
    const id = Number(req.params.id)
    const contact = contacts.find(c => c.id === id)

    if(!contact){
        return res.status(404).json({message:"Contact not found"})
    }

    const { name , phone } = req.body;

    if(name) contact.name = name
    if(phone) contact.phone = phone

    res.json({
        message:"Contact updated successfully",
        updated:contact
    })
})

app.delete('/contacts/:id',(req,res)=>{
    const id = req.params.id
    const index = contacts.findIndex(c => c.id === id)

    if(index !== -1){
        return res.status(404).json({message:"Contact not found"})
    }

    const deleted = contacts.splice(index,1)
    res.json({
        message:`Contact with id : ${id} is deleted successfully`,
        deleted:deleted[0]
    })
})

app.get('/contacts',(req,res)=>{
    res.json(contacts)
})

app.get('/contacts/:id',(req,res)=>{
    const id = Number(req.params.id)
    const contact = contacts.find(c => c.id === id)

    if(contact){
        res.json(contact)
    }else{
        res.status(404).json({message:"Contact not found"})
    }
})

app.listen(3000,()=>{
    console.log('Server running on port 3000');
})