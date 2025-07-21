const mongoose = require('mongoose')// ye toh ham ne db.js mein bhi require kiya tha na yaha kyo require kar raha hai - the ans is jis file mein use karna chah rahe ho us file mein tumhe require karna padega 

// title & content 
// title - string 
// content - string 
const noteSchema = new mongoose.Schema({
    title : String,// ye hum ye bata rahe hai ki kis type ka data rahega 
    content:String
})

const noteModel = mongoose.Model('note',noteSchema)// yaha jo note likha hai ye model ka naam hai - jis collection ke andar hamara data hone wala hai uska naam hai note 
module.exports = noteModel; // hum is file mein model ko use nahi karte 

// use kaha karte hai server.js mein 
// basically model CRUD operations ko aasan banata hai


