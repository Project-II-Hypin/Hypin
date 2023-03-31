const User = require('../models/user');
const Artist = require('../models/artist');

async function create(req, res, next) {
    try {
        const artist = await Artist.findOne({ '_id': req.params.id });
        if (artist) {
            const user = await User.findOne({ '_id': `${req.user._id }` });
            if (!user.favorites.find(favorite => `${favorite.artistId}` === `${req.params.id}`)) {
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

async function deleteFavorite(req, res, next) {
    try {
        const user = await User.findOne({ '_id': `${req.user._id }` });
        const favoriteIdx = user.favorites.findIndex(favorite => `${favorite.artistId}` === `${req.params.id}`);
        if (favoriteIdx !== -1) {
                user.favorites.splice(favoriteIdx, 1);
                await user.save();
                res.redirect(`/artists/${req.params.id}`);
            } else {
                res.redirect(`/artists/${req.params.id}`);
            }
    } catch (error) {
        console.log(`At controllers/favorites.js: Error in create function: ${error}`);
    }
}

module.exports = {
    create,
    delete: deleteFavorite
};
