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
    }
});

module.exports = mongoose.model('Artist', artistSchema);