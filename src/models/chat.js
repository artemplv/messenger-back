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
    // alias: 'users',
  },
  chatInitiator: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
  lastMessage: {
    type: mongoose.ObjectId,
    ref: 'Message',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

chatSchema.virtual('users', {
  ref: 'User',
  localField: 'userIds',
  foreignField: '_id',
});

chatSchema.set('toJSON', {
  virtuals: true,
  transform: (_, converted) => {
    delete converted.__v; // eslint-disable-line no-param-reassign, no-underscore-dangle
    delete converted._id; // eslint-disable-line no-param-reassign, no-underscore-dangle
  },
});

module.exports = mongoose.model('Chat', chatSchema);
