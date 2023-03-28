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

const artistSchema = new Schema({
    artistId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    profile: String,
    image: {
        height: Number,
        width: Number,
        url: String
    },
    releases: [releaseSchema]
});

module.exports = mongoose.model('Artist', artistSchema);