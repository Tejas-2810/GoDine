const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Create a new user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isRestaurantOwner: {
    type: Boolean,
    default: false
  },
  passwordResetToken: String,
  passwordResetExpires: Date
},{ collection: 'Users' });

// Hash the password before saving it to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Reset password token generation for 30 minutes
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

// Create a new user model
const users = mongoose.model('Users', userSchema);

// Export the user model
module.exports = users;
