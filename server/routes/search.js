const express = require('express');
const router = express.Router();
const path = require('path');
const request = require('request');
const model = require('./models/search_models.js')

//search the API of the user's choice for jobs

//github
router.get('/gh/:searchterms', model.hubHunt)

//authentic jobs
router.get('/aj/:searchterms', (req, res) => {
  //search terms must be comma-separated - need this to be clear to the user
  let searchTerms = req.params.searchterms;
  //location will be a query string ?loc=
  let location = req.query.loc;
  let options = {
    url: `https://authenticjobs.com/api/?api_key=${process.env.AJ_KEY}&method=aj.jobs.search&loc=${location}&keywords=${searchTerms}`
  }
})

//indeed
router.get('/in/:searchterms', model.indeedHunt)




module.exports = router;
