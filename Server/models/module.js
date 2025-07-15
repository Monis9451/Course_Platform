const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
  
}, {
  timestamps: true
});

module.exports = mongoose.model('Module', moduleSchema);
