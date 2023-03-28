const Release = require('../models/release');
const ROOT_URL = 'http://api.discogs.com'
const SORT_ORDER = 'year,desc'
// Allows Legacy users to use fetch:
const fetch = require('node-fetch');

async function create() {
    try {
        const artistId = 5210284;
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
            console.log(release);
            await release.save();
        };
    } catch (err) {
        console.log(err);
    };
}

module.exports = {
    create,
};