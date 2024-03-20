const mongoose = require("mongoose");

// Create a new promotions schema
const promotionsSchema = new mongoose.Schema(
  {
    restaurantID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants", // Reference to the Restaurant collection
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    discountPrice: {
      type: Number,
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
