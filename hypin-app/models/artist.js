const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({

});

module.exports = mongoose.model('Artist', artistSchema);