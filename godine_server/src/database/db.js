const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://group02User:group02Password@godine-db.ed01wep.mongodb.net/GoDine"
    );
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

module.exports = { connectToDatabase };
