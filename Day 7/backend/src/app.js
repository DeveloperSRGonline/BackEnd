const express = require('express')
const songRoutes = require('./routes/song.routes')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())// req.body by default data read nahi kar sakta isliye hum ise use karte hain

app.use('/',songRoutes)

module.exports = app;