const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant"); // Import the Restaurant model

// MongoDB connection URI (replace with your own URI)
const uri =
  "mongodb+srv://group02User:group02Password@godine-db.ed01wep.mongodb.net/GoDine";

// Connect to MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Seed data to be inserted into the database
    const restaurantsData = [
      {
        restaurantName: "Restaurant 1",
        restaurantAddress: "Address 1",
        operatingHours: "10:00 AM - 10:00 PM",
        averagePrice: 20,
      },
      {
        restaurantName: "Restaurant 2",
        restaurantAddress: "Address 2",
        operatingHours: "11:00 AM - 9:00 PM",
        averagePrice: 25,
      },
      // Add more restaurant objects as needed
    ];

    // Insert seed data into the Restaurants collection
    Restaurant.insertMany(restaurantsData)
      .then(() => {
        console.log("Data inserted successfully");
        // Disconnect from MongoDB after data insertion
        mongoose.disconnect();
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        // Disconnect from MongoDB in case of error
        mongoose.disconnect();
      });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
