const mongoose = require("mongoose");

// Create a new reservation schema
const reservationSchema = new mongoose.Schema(
  {
    restaurantID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants", // Reference to the Restaurants collection
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Reference to the Users collection
      required: true,
    },
    reservationTime: {
      type: Date,
      required: true,
    },
    noOfGuests: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Cancel"],
      default: "Active",
    },
  },
  { collection: "Reservations" }
);

// Create a new reservation model
const Reservation = mongoose.model("Reservations", reservationSchema);

// Export the reservation model
module.exports = Reservation;
