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

chatSchema.virtual('lastMessage', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'chatId',
  options: { sort: { 'createdAt': -1 }, limit: 1 },
  justOne: true,
});

chatSchema.set('toJSON', {
  virtuals: true,
  transform: (_, converted) => {
    delete converted.__v;
    delete converted._id;
  },
});

module.exports = mongoose.model('Chat', chatSchema);
