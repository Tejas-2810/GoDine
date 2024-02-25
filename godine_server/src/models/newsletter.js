const mongoose = require("mongoose");

// Create a new newsletter schema
const newsletterSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Reference to the Users collection
      required: true,
    },
    newsLetterStatus: {
      type: String,
      enum: ["Subscribed", "Unsubscribed"],
      default: "Subscribed",
    },
  },
  { collection: "Newsletters" }
);

// Create a new newsletter model
const Newsletter = mongoose.model("Newsletters", newsletterSchema);

// Export the newsletter model
module.exports = Newsletter;
