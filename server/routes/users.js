const express = require('express');
const router = express.Router();
const path = require('path');
const Users = require('../models/users');
const Jobs = require('../models/jobs');

//NOTE: POSTing a new user will likely be handled by the authorization path

//GET all users
router.get('/', (req, res) => {

})

//GET specific user
router.get('/:userid', (req, res) => {

})

//PUT update specific user
router.put('/:userid', (req, res) => {

})

//GET all user's jobs
router.get('/:userid/jobs', (req, res) => {

})

//POST add a job for a user
router.post('/:userid/jobs', (req, res) => {
  //we'll utilize this route when a user either adds via the form or clicks on the 'add to interested' button upon searching
  let id = req.params.userid;
  //importantly, there needs to be a query string given to this endpoint in order to ascertain which of the user's queues this is going into (so, the value MUST be 'interested', 'inProgress', or 'complete')
  let q = req.query.q;
  
  //first, put the job in the jobs collection
  let job = new Jobs({
    api = req.body.api || '',
    apiSpecificId = req.body.apiSpecificId,
    title = req.body.title,
    company = req.body.company,
    location = req.body.location,
    link = req.body.link,
    description = req.body.description
  })
  job.save((err, job) => {
    if (err) console.log('err saving job:', err);
    else return job._id;
  })
  //next we've gotta update the user with the job in the correct queue
  .next(jobId => {
    console.log('jobId:', jobId);
    User.findOneAndUpdate(
      {_id: id},
      { $push: { `${q}`: jobId } },
      { new: true }
    )
    //return the updated user
    .then(user => {
      res.json(user);
    })
  }
})

//GET one of a user's jobs
router.get('/:userid/jobs/:jobid', (req, res) => {

})

//PUT update one of a user's jobs
router.put('/:userid/jobs/:jobid', (req, res) => {

})

//DELETE one of a user's jobs
router.delete('/:userid/jobs/:jobid', (req, res) => {

})

//POST job content specific to a user's job
router.get('/:userid/jobs/:jobid/content', (req, res) => {

})

//PUT update job content specific to a user's job
router.get('/:userid/jobs/:jobid/content/:contentid', (req, res) => {

})

module.exports = router;
