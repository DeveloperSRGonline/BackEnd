const express = require('express')
const indexRoutes = require('./routes/index.routes')
const app = express()
app.use((req,res,next)=>{
    console.log('This middleware is between app and routes');
    next();// iske baad ek important chij aap ko next call karna padta hai
})
app.use('/',indexRoutes)// jo bhi / par request aaygi toh vo forward ho jayegi indexRoutes 
// app ko pata hai ki aap ne "/" api index.routes.js mein create kiye ho
// app.use mein jo hamne '/' likha hai vaha sirf base route path likhe hai and jo chij change ho sakti hai use routes.js mein likhte hai 

module.exports = app;