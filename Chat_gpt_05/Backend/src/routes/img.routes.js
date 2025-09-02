const  express = require("express");
const authUser = require("../middlewares/auth.middleware");
const multer = require('multer');
const giveImgDetalis = require("../controllers/img.controllers");

const upload = multer({
    storage:multer.memoryStorage()
})

const router = express.Router();

router.post('/',authUser,upload.single('image'),giveImgDetalis)

module.exports = router;