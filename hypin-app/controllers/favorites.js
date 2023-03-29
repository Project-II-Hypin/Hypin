const Artist = require('../models/artist');

module.exports = {
    create,
    delete: deleteFavorite
};

//controllers/reviews.js

async function deleteFavorite(req, res, next) {
    try {
      const artist = await Artist.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
      // Rogue user!
      if (!artist) return res.redirect('/artists');
      // Remove the review using the remove method available on Mongoose arrays
      artist.reviews.remove(req.params.id);
      // Save the updated artist
      await artist.save();
      // Redirect back to the artist's show view
      res.redirect(`/artists/${artist._id}`);
    } catch (err) {
      // Let Express display an error
      return next(err);
      // res.redirect(`/artists/${artist._id}`);
    }
  }
  
  
  async function create(req, res) {
    try {
      const artist = await Artist.findById(req.params.id);
      req.body.user = req.user._id;
      req.body.userName = req.user.name;
      req.body.userAvatar = req.user.avatar;
      artist.reviews.push(req.body);
      await artist.save();
      res.redirect(`/artists/${artist._id}`);
    } catch (error) {
      // handle error
    }
  }
  