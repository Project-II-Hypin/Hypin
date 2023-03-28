const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
// You'll be creating this controller module next
const artistsCtrl = require('../controllers/artists');
	
// GET /artists/new
router.get('/new', artistsCtrl.new);

// GET /artist/releases/:id (show functionality) MUST be below new route

// POST /artists/new
router.post('/new',artistsCtrl.query);
// POST /artists
router.post('/',artistsCtrl.create);
//GET the artist page. 
router.get('artists/:id', artistsCtrl.show);

	
module.exports = router;
