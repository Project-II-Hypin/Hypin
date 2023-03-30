const express = require('express');
const router = express.Router();
const favoritesCtrl = require('../controllers/favorites');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/artists/:id/favorites', ensureLoggedIn, favoritesCtrl);

router.delete('/artist/:id', ensureLoggedIn, favoritesCtrl);

module.exports = router;