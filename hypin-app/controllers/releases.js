
const ROOT_URL = 'http://api.discogs.com'
const SORT_ORDER = 'year,desc'
// Allows Legacy users to use fetch:
const fetch = require('node-fetch');

const Artist = require("../models/artist")

async function show(req, res) {
    // //goal: populate the releases field of the artist doc
    // const artist = await Artist.findById(req.params.id);
    // //Do i need to populate here?
    // artist.releases.find( realease => realease === "" )
    // res.render(':id/show', { title:`${artist.name}`, artist })
}


module.exports = {
    show,
};