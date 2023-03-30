const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 3,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userAvatar: String,
    userId: {
        type: String,
        required: true
    },
    releaseId: {
        type: String,
        required: true
    }
},  {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);