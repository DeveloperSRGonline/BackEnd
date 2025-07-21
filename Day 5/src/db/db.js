const mongoose = require("mongoose");

// server database se kaise connect hoga ye logic db.js mein likh te hai

function connectToDB() {
  mongoose
    .connect(
      "mongodb+srv://shivamgarade05:gxOs7cWEjedr0Qli@cluster0.dhc1lej.mongodb.net/cohort"
    )
    .then(() => {
      console.log("connected to DB!");
    });
}

module.exports = connectToDB;
