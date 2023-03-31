const express = require('express');
const router = express.Router();

// Requires artists contoller functions:
const favoritesCtrl = require('../controllers/favorites');
// Requires oAuth middleware:
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /favorites
router.post('/:id', ensureLoggedIn, favoritesCtrl.create);

// DELETE /favorites/:id
router.delete('/:id/delete', ensureLoggedIn, favoritesCtrl.delete);

module.exports = router;