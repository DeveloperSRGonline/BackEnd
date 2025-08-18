const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    fullname:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    },
    password:{
        type:String
    }
},{
    timestamps:true
})


const userModel = mongoose.model('user',userSchema)


module.exports = userModel;