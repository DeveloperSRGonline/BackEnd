const app = require('./src/app')
const connectToDB = require('./src/db/db')

connectToDB()


app.listen(3000)