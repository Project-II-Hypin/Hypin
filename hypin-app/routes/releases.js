const express = require('express');
const router = express.Router();
const passport = require('passport');
// Allows Legacy users to use fetch:
const fetch = require('node-fetch');

const releasesCtrl = require('../controllers/releases');

// GET /<INSERT ROUTE NAME HERE> :
router.get('/artist/', function(req, res, next) {
   res.render('releases/artists', { title: 'Artist' });
});

// POST /<INSERT ROUTE NAME HERE> :
router.post('/', releasesCtrl.create);

//

module.exports = router;