const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User Must Have a Name'],
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, 'User Must Have an Email']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
