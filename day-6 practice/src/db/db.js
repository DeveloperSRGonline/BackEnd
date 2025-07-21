const  mongoose = require('mongoose') // mongoose ko require 

function connectToDB(){// is ke andar connection ka logic rahega 

    // mongoose.connect - ye
    mongoose.connect('mongodb+srv://shivamgarade05:gxOs7cWEjedr0Qli@cluster0.dhc1lej.mongodb.net/cohort')
    .then(()=>{// ye isliye ki internet ka bharosa nahi toh connect hone ke baad ye call back chalega jab connected ho jayega 
        console.log('connected to DB');
    })
}

module.exports = connectToDB; // ye hamein call yaha nahi karna hai ye hamein server.js mein call karna hai 
// db.js mein ham sirf logic likhte hai and server.js file mein ham ise call karte hai and ye production ki demand hai 
// hota kya hai tumhari local device se duniya ke kisi machine ya data base se connect hota hai and kisse connect hoga internet se and internet ka kuchh bharosa nahi toh jab bhi data base connect hoga tab ye call back chaladega

