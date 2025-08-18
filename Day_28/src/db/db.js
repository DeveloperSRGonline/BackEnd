// is file ka kaam hota hai ki db.js file ka logic kis tarike se liiho ge uska logic aap yaha likhte ho

const mongoose = require('mongoose')

async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Server is connected successfully!');
    }catch(err){
        console.log('Error in connecting to DataBase : ',err);
    }
}

module.exports = connectToDB;// use it in server.js