const mongoose = require('mongoose');


const imgSchema = new mongoose.Schema({
    image: String,
    imgDetails: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})

const imgModel = mongoose.model("img", imgSchema)

module.exports = imgModel;