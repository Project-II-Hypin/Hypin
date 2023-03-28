const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    artistId: {
        type: Number,
        required: true
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
    }
});

module.exports = mongoose.model('Artist', artistSchema);