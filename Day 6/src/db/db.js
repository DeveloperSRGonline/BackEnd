const mongoose = require('mongoose')

function connectTODB(){

    mongoose.connect("mongodb+srv://shivamgarade05:gxOs7cWEjedr0Qli@cluster0.dhc1lej.mongodb.net/cohort")
    .then(()=>{
        console.log("connected to DB");
    })
}

module.exports = connectTODB