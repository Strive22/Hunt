const express = require('express');
const router = express.Router();
const path = require('path');
const request = require('request');

//search the API of the user's choice for jobs

//github
router.get('/gh/:searchterms', (req, res) => {
  //search terms and location (if separate terms, e.g san+francisco) MUST be delimited by commas or a + sign
  let searchTerms = req.params.searchterms;
  let location = req.query.loc;
  let options = {
    url: `https://jobs.github.com/positions.json?description=${searchTerms}&location=${location}`
  }

  function getGithubJobs(err, response, body) {
    if (!err && response.statusCode === 200) {
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
          //NOTE: now substringing the description in App.js on the front end
          // desc = desc.substr(0,200) + '...';

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
  //search terms must be delimited by a COMMA (NOT a plus sign)
  let searchTerms = req.params.searchterms;
  //location will be a query string
  let location = req.query.loc.toLowerCase();
  location = location.replace(/,/g , "");
  location = location + "us";
  console.log('aj location', location);
  let options = {
    url: `https://authenticjobs.com/api/?api_key=${process.env.AJ_KEY}&method=aj.jobs.search&format=json&location=${location}&keywords=${searchTerms}`
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
  //search terms must be delimited by a comma or a plus sign
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
