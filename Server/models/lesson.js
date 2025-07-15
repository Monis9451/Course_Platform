const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  
}, {
  timestamps: true
});

module.exports = mongoose.model('Lesson', lessonSchema);
