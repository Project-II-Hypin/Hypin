// Allows access to .env variables:
require('dotenv').config();
// const Artist = require('../models/artist');
//const Release = require('../models/release');

// Allows Legacy users to use fetch:
const fetch = require('node-fetch');


// API call resources:
const ROOT_URL = 'http://api.discogs.com';
const PAGINATION = 'per_page=1&page=1';
const SORT_ORDER = 'year,desc';

async function newArtist() {
    const query = 'nickleback';
    try {
        const artistData = await fetch(`${ROOT_URL}/database/search?type=artist&q=${query}&${PAGINATION}&key=${process.env.CONSUMER_KEY}&secret=${process.env.CONSUMER_SECRET}`)
            .then(res => res.json())
            .then(res => console.log([res.results[0].title, res.results[0].id,]));
    } catch (err) {
        console.log(err);
    };
}

async function create(req, res, next) {
    const correctArtist = req.body.correctArtist;
    console.log(correctArtist);
    if (correctArtist) {
        const artistId = req.body.artistId;
        const releasesData = await fetch(`${ROOT_URL}/artists/${artistId}`)
        
    } else {
        res.redirect('/artists/new'); 
    }
}

create();

module.exports = {
    new: newArtist,
};
