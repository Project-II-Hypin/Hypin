// Allows Legacy users to use fetch:
const fetch = require('node-fetch');

const Artist = require("../models/artist");
const Review = require("../models/review");

async function show(req, res) {
    const idArr = req.params.id.split(':');
    await Artist.findById(idArr[1])
        .then(async result => {
            const release = result.releases.find( rel => `${rel._id}` === idArr[0]);
            const reviews = await Review.find({ releaseId: idArr[0] }).exec();
            res.render('releases/show', { title:`${release.title}`, release, redirectURL: req.params.id, reviews })
        });
}

module.exports = {
    show,
};