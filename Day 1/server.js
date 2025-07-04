const http = require('http')

const server = http.createServer((req,res)=>{
    res.end('Hello shivam from server')
})

server.listen(3000,()=>{// is line pe server start hota hai 
    console.log('Server is running on port 3000');
})