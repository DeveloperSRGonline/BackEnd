const express = require('express')// require for use express

const app = express()// server created
app.use(express.json())// middleware

const quotes = [// quotes array
    {
        id:1,
        author:"APJ Abdul Kalam",
        text:"Dream is not which you see in sleep, dream is something that does not let you sleep"
    },
    {
        id:2,
        author:"Swami Vivekananda",
        text:"Arise, Awake, and don't stop until you reach the goal."
    },
]
app.get('/',(req,res)=>{// welcome route
    res.json({
        message:"welcome to the quote API"
    })
})

app.post('/quotes',(req,res)=>{// to upload quotes form postman to server
    const { author , text } = req.body
    
    if(!author || !text){
        return res.status(400).json(
            {
                message : "Autor and text required"
            })
    }

    const newQuote = {
        id : quotes.length + 1,
        author,
        text,
    }

    quotes.push(newQuote)// old quote mein new quote ko add kar rahe hai
    res.status(201).json(newQuote)

})

app.delete('/quotes/:id',(req,res)=>{// to delete data from server
    const id = Number(req.params.id)
    const index = quotes.findIndex(q => q.id === id);

    if(index !== -1){
        const deletedQuote = quotes.splice(index,1)
        res.json({
            message:"quote is deleted successfully",
            deleted: deletedQuote[0]
        })
    }else{
        res.status(404).json({message : "Quote not found"})
    }
})

app.get('/quotes',(req,res)=>{// all quotes route
    res.json(quotes)
})

app.get('/quotes/:index',(req,res)=>{// finding specific route
    const index = Number(req.params.index)
    const findQuote = quotes.find(q => q.id === index)

    if(findQuote){
        res.json(findQuote)
    }else{
        res.status(404).json({
            message:"Quote not found"
        })
    }
})



app.listen('3000',()=>{// starting server
    console.log('server is running on port 3000!');
})