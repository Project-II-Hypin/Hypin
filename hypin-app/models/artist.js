const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const releaseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    thumb: String,
    artist: String,
    id: Number,
    reviews: []
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