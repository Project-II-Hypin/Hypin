const express = require('express');
const router = express.Router();

const releasesCtrl = require('../controllers/releases');

// GET /releases/:id/show
router.get("/:id/show", releasesCtrl.show);

module.exports = router;