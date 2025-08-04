const express = require(express)

const  router = express.Router()

router.post('/',(req,res)=>{
    const token = req.cookies.token
})

module.exports = router;