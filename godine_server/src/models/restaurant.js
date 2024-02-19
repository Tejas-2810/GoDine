const mongoose = require("mongoose");

// Create a new restaurant schema
const restaurantSchema = new mongoose.Schema(
  {
    restaurantID: mongoose.Schema.Types.ObjectId,
    restaurantName: {
      type: String,
      required: true,
    },
    restaurantAddress: {
      type: String,
      required: true,
    },
    availability: {
      type: [String],
      enum: ["morning", "afternoon", "night"],
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
const Restaurant = mongoose.model("Restaurants", restaurantSchema);

// Export the restaurant model
module.exports = Restaurant;
