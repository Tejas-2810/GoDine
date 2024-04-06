const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Create a new user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber:{
      type: String,
      required: true
    },
    dateOfBirth: {
      type: String,
      required: false
    },
    address:{
      type: String,
      default: ""
    },
    role: {
      type: String,
      required: true,
      enum: ["restaurant owner", "user", "admin"],
      default: "user",
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurants",
      },
    ],
    restaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurants",
      },
    ],

    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { collection: "Users" }
);

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Reset password token generation for 30 minutes
userSchema.methods.createPasswordResetToken = function () {
  // Generate a random token using a simple method
  const resetToken = [...Array(32)]
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join("");
  this.passwordResetToken = bcrypt.hashSync(resetToken, 12);
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

// Create a new user model
const users = mongoose.model("Users", userSchema);

// Export the user model
module.exports = users;
