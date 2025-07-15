const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
  
}, {
  timestamps: true
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
