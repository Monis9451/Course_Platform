const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title : {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Float,
        required: true
    },

    catagory: {
        type: String,
        required: true
    },

    thumbnail: {
        type: String,
        required: true
    },

    modules: [{
        type: Schema.Types.ObjectId,
        ref: 'Module'
    }],

}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
