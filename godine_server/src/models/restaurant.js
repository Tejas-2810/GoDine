const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  restaurantAddress: {
    type: String,
    required: true,
  },
  pricing: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  operatingHours: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  seatingCapacity: {
    type: Number,
    required: true,
  },
  features: {
    acceptsReservations: {
      type: Boolean,
      default: false,
    },
    outdoorSeating: {
      type: Boolean,
      default: false,
    },
    wifiAvailable: {
      type: Boolean,
      default: false,
    },
  },
  menu: [{ type: String }], 
  photos: [{ type: String }], 
}, {
  collection: "Restaurants"
});

const restaurant = mongoose.model("Restaurants", restaurantSchema);

module.exports = restaurant;
