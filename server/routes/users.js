const express = require('express');
const router = express.Router();
const path = require('path');
const Users = require('../models/users');
const Jobs = require('../models/jobs');
const JobContent = require('../models/jobContent');

//NOTE: POSTing a new user will likely be handled by the authorization path

//GET all users
router.get('/', (req, res) => {
  Users.find({}, (err, users) => {
    if (err) {
      console.log(`Find all users error: ${err}`);
      res.send(err);
    } else {
      console.log(`Find all users: ${users}`);
      res.send(users);
    }
  })
})

//GET specific user
router.get('/:userid', (req, res) => {
  Users.findOne({ _id: req.params.userid })
  //may be able to take this populate out later if the populate occurs elsewhere
  .populate('interested inProgress complete jobContent')
  .exec((err, result) => {
    if (err) console.log(`Error: ${err}`)
  })
  .then(found => {
    res.send(found);
  })
})

//PUT update specific user
//This route is for updating information on the user's profile and will provide params in the body specifying the elements to be updated
router.put('/:userid', (req, res) => {
  let toUpdate = {};
  for (key in req.body) {
    toUpdate[key] = req.body[key];
  }

  Users.findOneAndUpdate(
    { _id: req.params.userid },
    toUpdate, 
    { new: true },
    (err, user) => {
      if (err) console.log(`Error in user PUT: ${err}`);
      res.send(user);
    }
  )
})

//GET all user's jobs
router.get('/:userid/jobs', (req, res) => {
  Users.findOne({ _id: req.params.userid })
  //may be able to take this populate out later if the populate occurs elsewhere
  .populate('interested inProgress complete jobContent')
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
  let userId = req.params.userid;
  //importantly, there needs to be a query string given to this endpoint in order to ascertain which of the user's queues this is going into (so, the value MUST be 'interested', 'inProgress', or 'complete')
  let q = req.query.q;
  
  //second, put the job in the jobs collection
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
  job.save().then(job => {
    //next we've gotta update the user with the job in the correct queue
    let jobId = job._id;
    //create the job content doc that'll be associated with this user and job
    let jobContent = new JobContent({
      user_id: userId,
      job_id: jobId
    })
    jobContent.save().then(content => {
      jobContentId = content._id;
      //toPush has to be separately defined so we can use the query indicating which array the jobId should be pushed into
      let toPush = {};
      //push to the right job array
      toPush[q] = jobId;
      //also wanna push the new jobContent id into that array
      toPush.jobContent = jobContentId; 
      Users.findOneAndUpdate(
        { _id: userId },
        { $push: toPush },
        { new: true }
      )
      //return the updated user
      .then(user => {
        res.json(user);
      })
    })
  })
})

//GET one of a user's jobs
router.get('/:userid/jobs/:jobid', (req, res) => {
  Users.findOne({ _id: req.params.userid })
  //may be able to take this populate out later if the populate occurs elsewhere
  .populate('interested inProgress complete jobContent')
  .exec((err, result) => {
    if (err) console.log(`Error: ${err}`)
  })
  .then(found => {
    res.send(found);
  })
})

//PUT update one of a user's jobs (this route may be unnecessary)
router.put('/:userid/jobs/:jobid', (req, res) => {

})

//DELETE one of a user's jobs
//This route will also need a query string providing the name of the correct queue
router.delete('/:userid/jobs/:jobid', (req, res) => {
  let q = req.query.q;
  let toDelete = {};
  toDelete[q] = req.params.jobid;

  Users.update( { _id: req.params.userid },
  { $pull: toDelete } )
  .then(done => {
    if (done) {
      res.json(done);
    } else {
      res.json({error: 'user and/or job not found'})
    }
  }).catch(error => {
    throw error;
  })
})

//POST job content specific to a user's job
router.get('/:userid/jobs/:jobid/content', (req, res) => {

})

//PUT update job content specific to a user's job
router.get('/:userid/jobs/:jobid/content/:contentid', (req, res) => {

})

module.exports = router;
