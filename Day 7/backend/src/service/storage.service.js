var ImageKit = require("imagekit");
var mongoose = require('mongoose')



var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

function uploadFile(file){
    return new Promise((resolve,reject)=>{
        imagekit.upload({
            file:file.buffer,// jo buffer hai file ka use imagekit pe upload karta hai 
            fileName:(new mongoose.Types.ObjectId()).toString(),
            folder:'cohort-audio',
        },(error,result)=>{
            if(error){
                reject(error);
            }else{
                resolve(result); // phir uske through jo url milegi imagekit ke form mein vo reslut mein return kar deta hai 
            }
        })
    })
}

module.exports = uploadFile;