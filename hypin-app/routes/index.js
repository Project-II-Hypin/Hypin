const express = require('express');
const router = express.Router();
// Allows for Roger to use fetch:
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
