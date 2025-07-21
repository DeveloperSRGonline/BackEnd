const express = require("express");
const multer = require("multer");
const uploadFile = require("../service/storage.service");
const router = express.Router();
const songModel = require('../models/song.model')

const upload = multer({ storage: multer.memoryStorage() });

router.post("/songs", upload.single("audio"),async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const fileData = await uploadFile(req.file)// uploadFile is function ki madat se file ka data imagekit pe upload kar raha hai and vo hame file ka data fileData is variable mein return kar raha hai 

  const song = await songModel.create({
    title:req.body.title,
    artist:req.body.artist,
    audio:fileData.url,
    mood:req.body.mood,
  })

  res.status(201).json({
    message: "Song created successfully",
    song: req.body,
    file: req.file.originalname,
  });
});

router.get('/songs',async (req,res)=>{
  const {mood} = req.query

  const songs = await songModel.find({// iska matlab hai ki app ko jo song bole hai vo song lekar aana hai
    mood:mood
  })

  res.status(200).json({
    message:'Songs fetched successfully!',
    songs:songs
  })
})

module.exports = router;
