const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
  
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    courseID: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },

    purchaseDate: {
        type: Date,
        default: Date.now
    },

    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },

    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

}, {
  timestamps: true
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
