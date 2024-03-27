const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    userType: {
      type: String,
      required: [true, "User type is required"],
      enum: ["user", "restaurant owner"],
    },
  },
  { collection: "Contacts" }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
