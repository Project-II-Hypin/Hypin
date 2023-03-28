// Allows access to .env variables:
require('dotenv').config();

// Requires models:
const Artist = require('../models/artist');

// Allows Legacy users to use fetch:
const fetch = require('node-fetch');

// API call resources:
const ROOT_URL = 'http://api.discogs.com';
const PAGINATION = 'per_page=1&page=1';
const SORT_ORDER = 'year,desc';

async function show(req, res) {
    //goal: populate the releases field of the artist doc
    const artist = await Artist.findByID(req.params.id);
    res.render(`artists/${artist._id}`, { title:`${artist.name}`, artist })
}


async function newArtist(req, res, next) { 
    res.render('artists/new', { title: 'New Artist', artistData: undefined, invalidArtist: false });
}

async function artistQuery(req, res, next) {
    const query = req.body.artistname;
    try {
        await fetch(`${ROOT_URL}/database/search?type=artist&q=${query}&${PAGINATION}&key=${process.env.CONSUMER_KEY}&secret=${process.env.CONSUMER_SECRET}`)
            .then(result => result.json())
            .then(async result => {
                if (result.results.length) {
                    const artistId = result.results[0].id
                    const artistExists = await Artist.exists({ artistId: artistId })
                    if (!artistExists) {
                        res.render('artists/new', {
                            title: 'New Artist', 
                            artistData: [result.results[0].title, artistId],
                            invalidArtist: false
                        });
                    } else {
                        res.redirect(`/artists/${artistExists._id}`);
                    }
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
                async function releaseHelper(url, id) {
                    const thumb = await fetch(`${url}/masters/${id}?key=${process.env.CONSUMER_KEY}&secret=${process.env.CONSUMER_SECRET}`)
                    .then(result => result.json())
                    .then(result => {
                        if (result.images.length) {
                            return result.images[0].uri
                        } else {
                            return ''
                        }
                    });
                    return thumb
                }
                async function releasesHelper(url, id, order) {
                    const releasesArr = [];
                    await fetch(`${url}/artists/${id}/releases?${order}?key=${process.env.CONSUMER_KEY}&secret=${process.env.CONSUMER_SECRET}}`)
                        .then(releasesData => releasesData .json())
                        .then(async releasesData  => {
                            for (const releaseData of releasesData.releases) {
                                if (releaseData.type === 'master') {
                                const release = {
                                    title: releaseData.title,
                                    year: releaseData.year,
                                    thumb: await releaseHelper(ROOT_URL, releaseData.id),
                                    reviews: [],
                                    artist: releaseData.artist,
                                    id: releaseData.id
                                };
                                releasesArr.push(release);
                                }
                            }
                        })
                    return releasesArr
                } 
                const artistData = new Artist({
                    artistId: result.id,
                    name: result.name,
                    profile: result.profile,
                    image: dataHelper(result.images),
                    releases: await releasesHelper(ROOT_URL, artistId, SORT_ORDER)
                });
                await artistData.save()
                    .then(res.redirect('/'));
            });
        } catch(err) {
            console.log(`Error in create function: ${err}`);
            // res.status(500).send({ message: 'An error occurred while saving the artist data' });
        }
    } else {
        res.redirect('/artists/new'); 
    }
}

module.exports = {
    new: newArtist,
    query: artistQuery,
    create,
    show
};