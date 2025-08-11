const express = require('express')
const indexRoutes = require('./routes/index.route')

const app = express()
app.set('view engine','ejs')
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',indexRoutes)



module.exports = app;