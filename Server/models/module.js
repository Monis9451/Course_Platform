const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
    title: { 
        type: String,
        required: true
    },

    courseID: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },

    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    }],

}, {
  timestamps: true
});

module.exports = mongoose.model('Module', moduleSchema);
