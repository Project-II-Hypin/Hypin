const Release = require('../models/release');
const ROOT_URL = 'http://api.discogs.com'
const SORT_ORDER = 'year,desc'
// Allows Legacy users to use fetch:
const fetch = require('node-fetch');

// Pulls all releases for an artist from the database:

// Adds all releases for an artist to the database:
async function create(req, res, next) {
    try {
        const artistId = 108713;
        const releasesData = await fetch(`${ROOT_URL}/artists/${artistId}/releases?${SORT_ORDER}`)
            .then(res => res.json())
        for (const releaseData of releasesData.releases) {
            const release = new Release({
                   title: releaseData.title,
                   year: releaseData.year,
                   thumb: releaseData.thumb,
                   reviews: [],
                   artist: releaseData.artist,
                   id: releaseData.id
                });
            await release.save();
        };
    } catch (err) {
        console.log(err);
    };
}

module.exports = {
    create,
};