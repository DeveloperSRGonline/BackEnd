// Import mongoose library (used for working with MongoDB in Node.js)
const mongoose = require("mongoose");

// Create a schema (blueprint/structure) for how a user will look in the database
const userSchema = new mongoose.Schema({
  // Every user must have an email
  email: {
    type: String,      // email will be stored as a String
    required: true,    // this field is mandatory
    unique: true,      // no two users can have the same email
  },

  // Full name is an object containing firstName and lastName
  fullName: {
    firstName: {
      type: String,    // first name stored as String
      required: true,  // must always be provided
    },
    lastName: {
      type: String,    // last name stored as String
      required: true,  // must always be provided
    },
  },

  // Password field for authentication
  password: {
    type: String,      // stored as String (later you will hash it before saving)
  },
},{
  timestamps:true // this means now database maintain when user is created or updated 
});

// Create a model from the schema
// mongoose.model("user", userSchema)
// "user" → name of the collection (MongoDB will make it "users")
// userSchema → tells MongoDB how the data should be structured
const userModel = mongoose.model("user", userSchema);

// Export the model so you can use it in other files (e.g., routes, controllers)
module.exports = userModel ;
