const Artist = require('../models/artist');
const Release = require('../models/release');



module.exports = {
    new: newArtist,
};

passport.serializeUser(function(user, cb) {
    cb(null, user._id);
  });

  passport.deserializeUser(async function(userId, cb) {
    cb(null, await User.findById(userId));
    // The above async/await code replaces this code
    // User.findById(userId).then(function(user) {
    //   cb(null, user);
    // });
  });