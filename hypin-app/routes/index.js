const express = require('express');
const router = express.Router();
const passport = require('passport');

// Allows Legacy users to use fetch:
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
   //loading the TITLE here needs to be changed.
 //upodated index/hypin.app
  res.render('index', { title: 'Express' });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect('/');
  });
});


module.exports = router;
