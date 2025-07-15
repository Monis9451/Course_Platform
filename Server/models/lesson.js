const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true,
        enum: ['video', 'quiz', 'assignment', 'audio', 'image']
    },

    contentURL: {
        type: String,
        required: function() {
            return this.type !== 'quiz' && this.type !== 'assignment';
        }
    },

    textContent: {
        type: String,
        required: function() {
            return this.type === 'quiz' || this.type === 'assignment';
        }
    },

    moduleID: {
        type: Schema.Types.ObjectId,
        ref: 'Module',
        required: true
    },

}, {
  timestamps: true
});

module.exports = mongoose.model('Lesson', lessonSchema);
