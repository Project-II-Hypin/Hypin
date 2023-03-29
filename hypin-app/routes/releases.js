const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const releasesCtrl = require('../controllers/releases');

// WHAT getting a showpage to render for our releases based on the ID 
router.get("/:id/show", releasesCtrl.show)
//now go build the show ctrlr

module.exports = router;