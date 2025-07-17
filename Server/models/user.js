const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User Schema
 * Stores user data from Firebase authentication
 * Firebase handles the authentication, we just store the user data
 */
const userSchema = new Schema({
  // Firebase User ID (required for linking with Firebase auth)
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },

  // User email address
  email: {
    type: String,
    required: true,
    lowercase: true
  },

  // User display name (optional)
  displayName: {
    type: String,
    default: ''
  },
  
  // User role (default is 'user')
  role: {
    type: String,
    enum: ['user', 'admin', 'instructor'],
    default: 'user'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
