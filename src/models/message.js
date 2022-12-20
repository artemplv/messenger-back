const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  content: {
    type: String,
    trim: true,
    required: true,
  },
  chatId: {
    type: mongoose.ObjectId,
    ref: 'Chat',
  },
  userId: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);
