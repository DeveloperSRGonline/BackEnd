var ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: process.env.your_public_api_key,
  privateKey: process.env.your_private_api_key,
  urlEndpoint: process.env.URL_ENDPOINT,
});


async function uploadFile(file,filename){
    // imagekit pe file ko upload karke jo bhi data hai use return kar lete hai
    const response = await imagekit.upload({
        file:file,
        fileName:filename,
        folder:"cohort-ai-social"
    })

    return response;
}

module.exports = uploadFile;