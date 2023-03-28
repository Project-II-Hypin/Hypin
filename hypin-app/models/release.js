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
    } 
});

const releaseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    thumb: String,
    artist: String,
    id: Number,
    reviews: [reviewSchema]
});

module.exports = mongoose.model('Release', releaseSchema);