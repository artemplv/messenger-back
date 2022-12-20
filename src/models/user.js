const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'firstname not provided '],
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    unique: [true, 'username already exists in database!'],
    lowercase: true,
    trim: true,
    required: [true, 'username not provided'],
  },
  role: {
    type: String,
    enum: ['normal', 'admin'],
    default: 'normal',
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('User', userSchema);
