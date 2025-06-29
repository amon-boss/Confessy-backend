const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: false },
  phone: { type: String, required: false },
  password: { type: String, required: true },
  username: { type: String, required: false },
  isAnonymous: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
