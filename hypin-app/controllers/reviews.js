// const Release = require('../models/release');

// module.exports = {
//     create,
//     delete: deleteReview
// };

// //controllers/reviews.js

// async function deleteReview(req, res, next) {
//     try {
//       const release = await Release.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
//       // Rogue user!
//       if (!release) return res.redirect('/releases');
//       // Remove the review using the remove method available on Mongoose arrays
//       release.reviews.remove(req.params.id);
//       // Save the updated release
//       await release.save();
//       // Redirect back to the release's show view
//       res.redirect(`/releases/${release._id}`);
//     } catch (err) {
//       // Let Express display an error
//       return next(err);
//       // res.redirect(`/releases/${release._id}`);
//     }
//   }
  
  
//   async function create(req, res) {
//     try {
//       const release = await Release.findById(req.params.id);
//       req.body.user = req.user._id;
//       req.body.userName = req.user.name;
//       req.body.userAvatar = req.user.avatar;
//       release.reviews.push(req.body);
//       await release.save();
//       res.redirect(`/releases/${release._id}`);
//     } catch (error) {
//       // handle error
//     }
//   }
  