const express = require('express');
const router = express.Router();
const passport = require('passport');
// Allows Legacy users to use fetch:
const fetch = require('node-fetch');

const releasesCtrl = require('../controllers/releases');

// WHAT getting a showpage to render for our releases based on the ID 
router.get("/:id", releasesCtrl.show)
//now go build the show ctrlr

module.exports = router;