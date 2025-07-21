require('dotenv').config();
 // Load environment variables
const app = require('./src/app');// server create
const connectToDB = require('./src/db/db'); // Your DB connection function

// Connecting to MongoDB
connectToDB();

// Starting the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
