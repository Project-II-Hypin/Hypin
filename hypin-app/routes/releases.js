const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const releasesCtrl = require('../controllers/releases');

// GET /movies
router.get('/', releasesCtrl.index);
// GET /movies/new
router.get('/new', releasesCtrl.new);
// GET /movies/:id (show functionality) MUST be below new route
router.get('/:id', releasesCtrl.show);
// POST /movies
router.post('/', releasesCtrl.create);

module.exports = router;