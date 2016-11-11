const express = require('express');
const router = express.Router();
const path = require('path');
const request = require('request');

// const model = require('./models/search_models.js')

//search the API of the user's choice for jobs
//PLEASE NOTE ALL LOCATIONS OTHER THAN GITHUB ARE HARDCODED TO AUSTIN FOR THE TIME BEING. AUSTIN CURRENTLY HAS NO GITHUB LISTINGS AT ALL SO IT IS HARDCODED TO SAN FRANCISCO.

//github
router.get('/gh/:searchterms', (req, res) => {
  //search terms MUST be comma-delimited
  let searchTerms = req.params.searchterms;
  let location = req.query.loc;
  let options = {
    url: `https://jobs.github.com/positions.json?description=${searchTerms}&location=sanfrancisco`
  }

  function getGithubJobs(err, response, body) {
    if (!err && response.statusCode === 200) {
      //if less than 10 results, will return them all
      body = JSON.parse(body);
      if (body.length === 0){
        res.send('Sorry, no jobs matched your search.')
      } else {
        let jobs = body.map(job => {
          let desc = job.description;
          //remove the messy stuff
          desc = desc.replace('<br>', '  ');
          desc = desc.replace('<p>', '  ');
          desc = desc.replace(/<(?:.|\n)*?>/gm, '');
          desc = desc.replace(/\n/gm, '  ');
          desc = desc.replace('&amp;', '');
          //eventually we'll want to do this on the front end I think
          desc = desc.substr(0,200) + '...';

          return {
            api: "Github Jobs",
            apiSpecificId: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            link: job.url,
            description: desc
          } 
        })
        res.send(jobs);
      }
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
  let location = req.query.loc;
  let options = {
    url: `https://authenticjobs.com/api/?api_key=${process.env.AJ_KEY}&method=aj.jobs.search&format=json&location=austintxus&keywords=${searchTerms}`
  }

  function getAuthenticJobs(err, response, body) {
    if (!err && response.statusCode === 200) {
      body = JSON.parse(body);
      if (body.listings.listing.length === 0) {
        res.send('Sorry, no jobs matched your search.');
      } else {
        let jobs = body.listings.listing.map(job => {
          let desc = job.description;
          //remove the messy stuff
          desc = desc.replace('<br>', '  ');
          desc = desc.replace('<p>', '  ');
          desc = desc.replace(/<(?:.|)*?>/gm, '');
          desc = desc.replace(/\n/gm, '  ');
          desc = desc.replace('&amp;', '');
          //eventually we'll want to do this on the front end I think
          desc = desc.substr(0,200) + '...';

          return {
            api: "Authentic Jobs",
            apiSpecificId: job.id,
            title: job.title,
            company: job.company.name,
            location: job.company.location.name,
            link: job.url,
            description: desc
          } 
        })
        res.send(jobs);
      }

    } else {
      console.log(`Error in AJ API call: ${err}`);
    }
  }

  request(options, getAuthenticJobs);
})

//indeed
router.get('/in/:searchterms', (req, res) => {
  let searchTerms = req.params.searchterms;
  //location must be city,state or a zipcode
  let location = req.query.loc;
  let options = {
    url: `http://api.indeed.com/ads/apisearch?publisher=${process.env.INDEED_KEY}&format=json&q=${searchTerms}&l=${location}&v=2`
  }

  function getIndeedJobs(err, response, body) {
    if (!err && response.statusCode === 200) {
      body = JSON.parse(body);
      body = body.results;
      if (body.length === 0) {
        res.send('Sorry, no jobs matched your search.')
      } else {
        let jobs = body.map(job => {
          let desc = job.snippet;
          //remove the messy stuff
          desc = desc.replace('<br>', '  ');
          desc = desc.replace('<p>', '  ');
          desc = desc.replace(/<(?:.|)*?>/gm, '');
          desc = desc.replace(/\n/gm, '  ');
          desc = desc.replace('&amp;', '');
          //eventually we'll want to do this on the front end I think
          desc = desc.substr(0,200) + '...';

          return {
            api: "Indeed",
            apiSpecificId: job.jobkey,
            title: job.jobtitle,
            company: job.company,
            location: job.formattedLocation,
            link: job.url,
            description: desc
          } 
        })
        res.send(jobs);
      }
    } else {
      console.log(`Error in Indeed API call: ${err}`);
    }
  }

  request(options, getIndeedJobs);
})




module.exports = router;
