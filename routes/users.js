const express = require('express');
const router = express.Router();

const userCtrl = require("../controllers/users");

// Requires oAuth middleware:
const ensureLoggedIn = require('../config/ensureLoggedIn');

//GET /users/:id
router.get("/user", ensureLoggedIn, userCtrl.show);

module.exports = router;
