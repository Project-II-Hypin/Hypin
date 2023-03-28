const express = require('express');
const router = express.Router();
const passport = require('passport');
// Allows Legacy users to use fetch:
const fetch = require('node-fetch');

const releasesCtrl = require('../controllers/releases');

module.exports = router;