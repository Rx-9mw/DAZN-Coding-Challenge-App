const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// The mongoose template for a new user.
const newUserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  numberOfCurrentStreams: {
    type: Number,
    default: 0
  }
});

const newUser = mongoose.model('User', newUserSchema);

module.exports = newUser;