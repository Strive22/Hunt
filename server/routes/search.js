const express = require('express');
const router = express.Router();
const path = require('path');

//search the API of the user's choice for jobs

//github
router.get('/gh/:searchterms', (req, res) => {
  console.log('this should hit and log somewhere');
  res.status(404).send(req);
});

//authentic jobs
router.get('/aj/:searchterms', (req, res) => {

});

//indeed
router.get('/in/:searchterms', (req, res) => {

});



module.exports = router;
