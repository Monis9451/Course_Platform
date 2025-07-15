const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true
  },

  displayName: String,
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"]
  },
  
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
