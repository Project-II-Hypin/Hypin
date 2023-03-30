const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  artistId: {
    type: String,
    required: true
  },
  artistName: {
    type: String,
    required: true
  },
  artistImage: String
}, {
  timestamps: true
});

const userSchema = new Schema({
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    favorites: [favoriteSchema]
  }, {
    timestamps: true
  });
  

module.exports = mongoose.model('User', userSchema);

