const mongoose = require("mongoose");

// Create a new payment schema
const paymentSchema = new mongoose.Schema(
  {
    PaymentID: mongoose.Schema.Types.ObjectId,
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Reference to the Users collection
      required: true,
    },
    reservationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservations", // Reference to the Reservations collection
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["credit", "debit", "interac"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
  },
  { collection: "Payments" }
);

// Create a new payment model
const Payment = mongoose.model("Payments", paymentSchema);

// Export the payment model
module.exports = Payment;
