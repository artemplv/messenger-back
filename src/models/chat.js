const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  userIds: {
    type: [mongoose.ObjectId],
    ref: 'User',
  },
  chatInitiator: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Chat', chatSchema);
