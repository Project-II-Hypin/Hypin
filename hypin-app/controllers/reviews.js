// Requires models:
const Review = require('../models/review');
  
async function create(req, res, next) {
    try {
        const review = {
            content: req.body.content,
            rating: req.body.rating,
            username: req.user.name,
            userAvatar: req.user.avatar,
            userId: req.user._id,
            releaseId: req.body.id,
        }
        console.log(review);
        await Review.create(review);
        res.redirect(`/releases/${req.body.redirectURL}/show`);
    } catch (error) {
        console.log(`At controllers/reviews.js: Error in create function: ${error}`);
    }
}

async function deleteReview(req, res, next) {
    try {
        const review = await Review.findOne({ '_id': req.params.id, 'userId': req.user._id });
        // Rogue user!
        if (!review) {
            res.redirect(`/releases/${req.body.redirectURL}/show`);
        } else {
            await Review.findOneAndDelete({ '_id': req.params.id, 'userId': req.user._id })
                .then(res.redirect(`/releases/${req.body.redirectURL}/show`));
        }
    } catch (err) {
        console.log(`At controllers/reviews.js: Error in delete function: ${error}`);
    }
}

module.exports = {
    create,
    delete: deleteReview
};