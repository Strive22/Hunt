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
  Users.findOne({ _id: req.params.userid })
  //may be able to take this populate out later if the populate occurs elsewhere
  //TODO: ADD jobContent to populate once the schema is initialized
  .populate('interested inProgress complete')
  .exec((err, result) => {
    if (err) console.log(`Error: ${err}`)
  })
  .then(found => {
    let allJobs = {
      interested: found.interested,
      inProgress: found.inProgress,
      complete: found.complete,
      jobContent: found.jobContent
    };
    res.send(allJobs);
  })
})

//POST add a job for a user
router.post('/:userid/jobs', (req, res) => {
  //we'll utilize this route when a user either adds via the form or clicks on the 'add to interested' button upon searching
  let id = req.params.userid;
  //importantly, there needs to be a query string given to this endpoint in order to ascertain which of the user's queues this is going into (so, the value MUST be 'interested', 'inProgress', or 'complete')
  let q = req.query.q;
  
  //first, put the job in the jobs collection
  //TODO: HANDLE THE CASE WHERE THE JOB IS ALREADY IN THE DB
  let job = new Jobs({
    api: req.body.api,
    apiSpecificId: req.body.apiSpecificId,
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    link: req.body.link,
    description: req.body.description
  })
  job.save((err, job) => {
    //next we've gotta update the user with the job in the correct queue
    let jobId = job._id;
    if (err) {
      console.log('err saving job:', err);
    } else {  
      //toPush has to be separately defined so we can use the query indicating which array the jobId should be pushed into
      let toPush = {};
      toPush[q] = jobId;
      Users.findOneAndUpdate(
        {_id: id },
        { $push: toPush },
        { new: true }
      )
      //return the updated user
      .then(user => {
        res.json(user);
      })
    }
  })
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
