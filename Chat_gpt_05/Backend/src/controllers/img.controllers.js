const imgModel = require("../models/img.model");
const { generateImgDetails } = require("../services/ai.service");
const { Buffer } = require("buffer");

async function giveImgDetalis(req, res) {
  const file = req.file;

  const base64ImageFile = Buffer.from(file.buffer).toString("base64");
  const details = await generateImgDetails(base64ImageFile);

  return res.json({ details });
}

module.exports = giveImgDetalis;
