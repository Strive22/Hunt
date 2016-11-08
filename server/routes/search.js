const express = require('express');
const router = express.Router();
const path = require('path');

//search the API of the user's choice for jobs

//github
router.get('/gh/:searchterms', (req, res) => {

})

//authentic jobs
router.get('/aj/:searchterms', (req, res) => {

})

//indeed
router.get('/in/:searchterms', (req, res) => {
  
})



module.exports = router;