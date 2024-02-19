const mongoose = require("mongoose");

// Create a new reservation schema
const reservationSchema = new mongoose.Schema(
  {
    reservationID: mongoose.Schema.Types.ObjectId,
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Reference to the Users collection
      required: true,
    },
    restaurantName: {
      type: String,
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
