
const ROOT_URL = 'http://api.discogs.com'
const SORT_ORDER = 'year,desc'
// Allows Legacy users to use fetch:
const fetch = require('node-fetch');

const Artist = require("../models/artist")

async function show(req, res) {
    //match the release id to the number that in my file
    //goal: populate the releases field of the artist doc
    console.log(req);
    const artist = await Artist.findById(req.params.id);
    console.log(artist);
    //const release = artist.releases.find( release => release.title === "");
    res.render(':id/show', { title:`${artist.name}`, release })
}


module.exports = {
    show,
};