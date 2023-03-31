const express = require('express');
const router = express.Router();

const userCtrl = require("../controllers/users");

// Requires oAuth middleware:
const ensureLoggedIn = require('../config/ensureLoggedIn');

//GET /users/show
router.get("/show", ensureLoggedIn, userCtrl.show);

module.exports = router;
