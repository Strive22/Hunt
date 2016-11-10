const express = require('express');
const router = express.Router();
const path = require('path');
const request = require('request');
// const xml = require('xml2js').parseString;

// const model = require('./models/search_models.js')

//search the API of the user's choice for jobs
//PLEASE NOTE ALL LOCATIONS ARE HARDCODED TO AUSTIN FOR THE TIME BEING.

//github
router.get('/gh/:searchterms', (req, res) => {
  let searchTerms = req.params.searchterms;
  let location;
  let options = {
    url: ``
  }

  function getGithubJobs(err, response, body) {
    if (!err && response.statusCode === 200) {
      res.send(body);
    } else {
      console.log(`Error in GH API call: ${err}`);
    }
  }

  request(options, getGithubJobs);
})

//authentic jobs
router.get('/aj/:searchterms', (req, res) => {
  //search terms must be comma-separated - need this to be clear to the user
  let searchTerms = req.params.searchterms;
  //location will be a query string
  // let location = req.query.loc;
  let options = {
    url: `https://authenticjobs.com/api/?api_key=${process.env.AJ_KEY}&method=aj.jobs.search&format=json&location=austintxus&keywords=${searchTerms}`
  }

  function getAuthenticJobs(err, response, body) {
    if (!err && response.statusCode === 200) {
      res.send(body);
    } else {
      console.log(`Error in AJ API call: ${err}`);
    }
  }

  request(options, getAuthenticJobs);
})

//indeed
router.get('/in/:searchterms', (req, res) => {
  let searchTerms = req.params.searchterms;
  let location;
  let options = {
    url: `http://api.indeed.com/ads/apisearch?publisher=${process.env.INDEED_KEY}&format=json&q=${req.params.search}&l=austin%2C+tx&v=2`
  }

  function getIndeedJobs(err, response, body) {
    if (!err && response.statusCode === 200) {
      res.send(body);
    } else {
      console.log(`Error in Indeed API call: ${err}`);
    }
  }

  request(options, getIndeedJobs);
})




module.exports = router;
