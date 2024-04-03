const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    eligibleRestaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurants",
      },
    ],
  },
  { timestamps: true }
);

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;
