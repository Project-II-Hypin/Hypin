const express = require('express');
const router = express.Router();
// Allows for Roger to use fetch:
const fetch = require('node-fetch');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
