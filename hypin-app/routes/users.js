const express = require('express');
const router = express.Router();
// Allows for Roger to use fetch:
const fetch = require('node-fetch');
const userCtrl = require("../controllers/users") 

/* GET users listing. */
// router.get('/user', function(req, res, next) {
//   //works just need to grow it to the resources. 
//   res.send('respond with a resource');
// });

//GET for the index /user/??:IDInformation??
router.get("/user", userCtrl.show)
//now go write the show controller.

module.exports = router;
