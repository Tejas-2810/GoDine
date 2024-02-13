const mongoose = require('mongoose');

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
  }
},{ collection: 'Users' });

const users = mongoose.model('Users', userSchema);

module.exports = users;
