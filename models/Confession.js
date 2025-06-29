const mongoose = require('mongoose');

const ConfessionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: false },
  anonymous: { type: Boolean, default: false },
  content: { type: String, required: true },
  likes: [{ type: String }],
  comments: [{
    user: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Confession', ConfessionSchema);
