const User = require('../models/user');
const Artist = require('../models/artist');

async function create(req, res, next) {
    try {
        const artist = await Artist.findOne({ '_id': req.params.id });
        console.log(`Artist name: ${artist.name}`);
        if (artist) {
            const user = await User.findOne({ '_id': `${req.user._id }` });
            if (!user.favorites.find(favorite => `${favorite.artisId}` === `${req.params.id}`)) {
                const favorite = {
                    artistId: req.params.id,
                    artistName: artist.name,
                    artistImage: artist.image.url,
                }
                user.favorites.push(favorite);
                await user.save();
                res.redirect(`/artists/${req.params.id}`);
            } else {
                res.redirect(`/artists/${req.params.id}`);
            }

        } else {
            res.redirect(`/artists/${req.params.id}`);
        }

    } catch (error) {
        console.log(`At controllers/favorites.js: Error in create function: ${error}`);
    }
}
/*
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
*/
module.exports = {
    create,
    //delete: deleteReview
};
