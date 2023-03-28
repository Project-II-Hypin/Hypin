// Allows access to .env variables:
require('dotenv').config();

// Requires models:
const Artist = require('../models/artist');
const Release = require('../models/release');

// Allows Legacy users to use fetch:
const fetch = require('node-fetch');

// API call resources:
const ROOT_URL = 'http://api.discogs.com';
const PAGINATION = 'per_page=1&page=1';
const SORT_ORDER = 'year,desc';

async function newArtist(req, res, next) { 
    res.render('artists/new', { title: 'New Artist', artistData: undefined });
}

async function artistQuery(req, res, next) {
    const query = req.body.artistname;
    try {
        await fetch(`${ROOT_URL}/database/search?type=artist&q=${query}&${PAGINATION}&key=${process.env.CONSUMER_KEY}&secret=${process.env.CONSUMER_SECRET}`)
            .then(result => result.json())
            .then(result => res.render('artists/new', {title: 'New Artist', artistData: [result.results[0].title, result.results[0].id,]}));
    } catch (err) {
        console.log(err);
    };
}

async function create(req, res, next) {
    const correctArtist = req.body.correctArtist;
    console.log(correctArtist);
    if (correctArtist) {
        const artistId = req.body.artistId;
        try {
            await fetch(`${ROOT_URL}/artists/${artistId}`)
            
        } catch(err) {
            console.log(err);
        }
    } else {
        res.redirect('/artists/new'); 
    }
}

module.exports = {
    new: newArtist,
    query: artistQuery,
    create,
 
};
