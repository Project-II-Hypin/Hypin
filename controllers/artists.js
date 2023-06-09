
// Requires models:
const Artist = require('../models/artist');
const User = require('../models/user');

// Allows Legacy users to use fetch:
// const fetch = require('node-fetch');

// API call resources:
const ROOT_URL = 'http://api.discogs.com';
const PAGINATION = 'per_page=1&page=1';
const SORT_ORDER = 'year,desc';

async function show(req, res) {
    const artist = await Artist.findById(req.params.id);
    let isFavorite = null;
    if (req.user) {
        const user = await User.findById(req.user._id);
        if (user.favorites.find(favorite => `${favorite.artistId}` === `${req.params.id}`)) {
            isFavorite = true;
        }
    }
    res.render('artists/show', { title:`${artist.name}`, artist, paramsId: req.params.id, isFavorite });
}

async function newArtist(req, res, next) { 
    res.render('artists/new', { title: 'New Artist', artistData: undefined, invalidArtist: false });
}

async function findArtist(req, res, next) { 
    res.render('artists/find', { title: 'Find Artist', artistNotFound: false });
}

async function artistFinder(req, res, next) {
    const query = req.body.artistname;
    const artist = await Artist.findOne({ name: query })
    if (artist) {
        res.redirect(`/artists/${artist._id}`);
    } else {
        res.render('artists/find', { title: 'Find Artist', artistNotFound: true });
    }
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
                        })
                    } else {
                        res.redirect(`/artists/${artistExists._id}`);
                    }
                } else {
                    res.render('artists/new', {title: 'New Artist', artistData: undefined, invalidArtist: true });
                    res.redirect(`/artists/${artist._id}`);
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
                        if (!result.images) {
                            return ''
                        } else if (result.images.length) {
                            return result.images[0].uri
                        } else {
                            return ''
                        }
                    });
                    return thumb
                }
                async function releasesHelper(url, id, order) {
                    const releasesArr = [];
                    await fetch(`${url}/artists/${id}/releases?${order}?key=${process.env.CONSUMER_KEY}&secret=${process.env.CONSUMER_SECRET}`)
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
                    .then(res.redirect(`/artists/${artistData._id}`));
            });
        } catch(err) {
            console.log(`Error in create function: ${err}`);
        }
    } else {
        res.redirect('/artists/new'); 
    }
}

module.exports = {
    new: newArtist,
    find: findArtist,
    finder: artistFinder,
    query: artistQuery,
    create,
    show,
};
