const Release = require('./models/release');
const ROOT_URL = 'http://api.discogs.com'
const SORT_ORDER = 'year,desc'

/*
async function create() {
    try {
        const artistId = 108713;
        const releasesData = await fetch(`${ROOT_URL}/artists/${artistId}/releases?${SORT_ORDER}`)
            .then(res => res.json())
        releasesData.releases.forEach(async releaseData => {
            const release = new Release(releaseData);
            console.log(release);
            await release.save();
            // await Release.create(releaseData);
        });
    } catch (err) {
        console.log(err);
    };
}
*/

async function create() {
    try {
        const artistId = 108713;
        const releasesData = await fetch(`${ROOT_URL}/artists/${artistId}/releases?${SORT_ORDER}`)
            .then(res => res.json())
        for (const releaseData of releasesData.releases) {
            const release = new Release(releaseData);
            console.log(release);
            await release.save();
        };
    } catch (err) {
        console.log(err);
    };
}

create();

module.exports = {
    create,
};

/*
        {
           title: releaseData.title,
           year: releaseData.year,
           thumb: releaseData.thumb,
           reviews: [],
           artist: releaseData.artist,
           id: releaseData.id
        }
*/