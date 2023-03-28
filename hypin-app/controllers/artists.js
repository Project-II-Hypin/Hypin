// Allows access to .env variables:
require('dotenv').config();

// Requires models:
const Artist = require('../models/artist');

// Allows Legacy users to use fetch:
const fetch = require('node-fetch');

// API call resources:
const ROOT_URL = 'http://api.discogs.com';
const PAGINATION = 'per_page=1&page=1';

async function newArtist(req, res, next) { 
    res.render('artists/new', { title: 'New Artist', artistData: undefined, invalidArtist: false });
}

async function artistQuery(req, res, next) {
    const query = req.body.artistname;
    try {
        await fetch(`${ROOT_URL}/database/search?type=artist&q=${query}&${PAGINATION}&key=${process.env.CONSUMER_KEY}&secret=${process.env.CONSUMER_SECRET}`)
            .then(result => result.json())
            .then(result => {
                if (result.results.length) {
                    res.render('artists/new', {
                        title: 'New Artist', 
                        artistData: [result.results[0].title, result.results[0].id,],
                        invalidArtist: false
                    });
                } else {
                    res.render('artists/new', {title: 'New Artist', artistData: undefined, invalidArtist: true });
                }
                
            });
    } catch (err) {
        console.log(err);
    };
}

async function create(req, res, next) {
    const correctArtist = req.body.correctArtist;
    if (correctArtist) {
        const artistId = req.body.artistId;
        console.log(artistId);
        try {
            await fetch(`${ROOT_URL}/artists/${artistId}?key=${process.env.CONSUMER_KEY}&secret=${process.env.CONSUMER_SECRET}`)
            .then(result => result.json())
            .then(async result => {
                function dataHelper(data) {
                    if (data) {
                        return {
                            height: data[0].height, 
                            width: data[0].width, 
                            url: data[0].resource_url
                        } 
                    }
                }
                const artistData = new Artist({
                    artistId: result.id,
                    name: result.name,
                    profile: result.profile,
                    image: dataHelper(result.images)
                }); 
                await artistData.save()
               // .then(res.redirect(`/releases/confirm/${artistId}`));
            })
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
