const mongoose = require("mongoose");

// Create a new promotions schema
const promotionsSchema = new mongoose.Schema(
  {
    restaurantID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants", 
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    validity: {
      type: Date,
      required: true,
    },
  },
  { collection: "Promotions" }
);

// Create a new promotions model
const Promotions = mongoose.model("Promotions", promotionsSchema);

// Export the promotions model
module.exports = Promotions;
