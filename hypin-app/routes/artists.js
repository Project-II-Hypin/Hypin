const express = require('express');
const router = express.Router();

// Allows Legacy users to use fetch:
// const fetch = require('node-fetch')

// Requires artists contoller functions:
const artistsCtrl = require('../controllers/artists');
	
// GET /artists/new
router.get('/new', artistsCtrl.new);
// GET /artists/find
router.get('/find',artistsCtrl.find);
// GET /artists/:id
router.get('/:id', artistsCtrl.show);

// POST /artists/new
router.post('/new',artistsCtrl.query);
// POST /artists
router.post('/',artistsCtrl.create);


	
module.exports = router;
