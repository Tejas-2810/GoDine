const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    restaurantID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservations",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    reservationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservations",
      required: true,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
    review: {
      type: String,
    },
  },
  { collection: "Review" }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
