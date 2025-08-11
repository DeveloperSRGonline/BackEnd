const postModel = require('../models/post.model');
const generateCaption = require('../service/ai.service');

async function createPostController(req,res){
    // jo file req ke andar jo file aa rahi hai us file ko ai ke pass dena hai and bolna hai ki is file ka tum caption generate karke do 
    const file = req.file;
    
    const base64ImageFile = new Buffer.from(file.buffer).toString('base64')

    // ai ko base64 img pass kar rahe hai and res ko caption me store kar le rahe hai 
    const caption = await generateCaption(base64ImageFile)

    res.json({
        caption
    })
}

module.exports = {
    createPostController
};