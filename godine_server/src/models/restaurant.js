const mongoose = require("mongoose");

// Create a new restaurant schema
const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },
    restaurantAddress: {
      type: String,
      required: true,
    },
    operatingHours: {
      type: String,
      required: true,
    },
    averagePrice: {
      type: Number,
      required: true,
    },
  },
  { collection: "Restaurants" }
);

// Create a new restaurant model
const restaurant = mongoose.model("Restaurants", restaurantSchema);

// Export the restaurant model
module.exports = restaurant;
