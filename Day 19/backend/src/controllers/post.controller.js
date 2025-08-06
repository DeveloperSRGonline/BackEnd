const postModel = require('../models/post.model');
const generateCaption = require('../service/ai.service');
const uploadFile = require('../service/storage.service');
const uuidv4 = require('uuid')

async function createPostController(req,res){
    // jo file req ke andar jo file aa rahi hai us file ko ai ke pass dena hai and bolna hai ki is file ka tum caption generate karke do 
    const file = req.file;
    
    const base64ImageFile = new Buffer.from(file.buffer).toString('base64')

    // ai ko base64 img pass kar rahe hai and res ko caption me store kar le rahe hai 
    const caption = await generateCaption(base64ImageFile)
    
    // image kit par file upload karte hai 
    const result  = await uploadFile(file.buffer,`${uuidv4}`)

    // ab finally post creat karenge 
    const post = await postModel.create({
        caption:caption,
        image:result.url,
        user:req.user._id,
    })

    // post create karne ke baad res bhejenge 
    res.status(201).json({
        message:"Post created successfully!",
        post,
    })
}

module.exports = {
    createPostController
};