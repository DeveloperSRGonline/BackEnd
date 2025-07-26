const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('MongoDB connected successfully');
    })
    .catch((error)=>{
        console.error('MongoDB connection failed:',error)
    })
}

module.exports = connectToDB;