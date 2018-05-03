const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
  _id: {
    type: String,
  },
session: { type: {} },
  expires: {
    type: Date,
    default: "",
    trim: true
  }
});
module.exports = mongoose.model('Session', SessionSchema);
