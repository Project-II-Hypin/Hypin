const express = require('express');
const router = express.Router();

// Requires artists contoller functions:
const reviewsCtrl = require('../controllers/reviews');
// Requires oAuth middleware:
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /reviews
router.post('/', ensureLoggedIn, reviewsCtrl.create);

// DELETE /reviews/:id
router.delete('/:id', ensureLoggedIn, reviewsCtrl.delete);

module.exports = router;