const express = require('express');
const router = express.Router();
const path = require('path');
const Users = require('../models/users');
const Jobs = require('../models/jobs');
const JobContent = require('../models/jobContent');

//NOTE: Posting new users is handled by the auth path, see googleAuth.js

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
  });
});

//GET specific user
router.get('/:userid', (req, res) => {
  Users.findById(req.params.userid)
  // the login route provides the primary populate, here is a backup
  .populate('interested inProgress complete jobContent')
  .exec((err, result) => {
    console.log('result:', result);
    if (err) { console.log(`Error: ${err}`); }
  })
  .then(found => {
    console.log(found);
    res.send(found);
  });
});

//PUT update specific user
//This route is for updating information on the user's profile and will provide data in the body specifying the elements to be updated
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
      if (err) { console.log(`Error in user PUT: ${err}`); }
      res.send(user);
    }
  );
});

//GET all user's jobs
router.get('/:userid/jobs', (req, res) => {
  Users.findOne({ _id: req.params.userid })
  //may be able to take this populate out later if the populate occurs elsewhere
  .populate('interested inProgress complete jobContent')
  .exec((err, result) => {
    if (err) { console.log(`Error: ${err}`); }
  })
  .then(found => {
    let allJobs = {
      interested: found.interested,
      inProgress: found.inProgress,
      complete: found.complete,
      jobContent: found.jobContent
    };
    res.send(allJobs);
  });
});

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
  });
  job.save().then(job => {
    //next we've gotta update the user with the job in the correct queue
    let jobId = job._id;
    //create the job content doc that'll be associated with this user and job
    let jobContent = new JobContent({
      user_id: userId,
      job_id: jobId
    });
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
      });
    });
  });
});

//PUT move a job to a new queue or DELETE a job from a queue
router.route('/:userid/jobs/:jobid/:queue')
  .put((req, res) => {
    let queue = req.params.queue;
    let jobId = req.params.jobid;
    let toAdd = {};
    toAdd[queue] = jobId;
    //when we add we want to remove from other lists
    //if queue = inProgress, remove from interested and complete; if queue == complete, remove from interested and inProgress; if queue === interested, remove from inProgress and complete
    let toRemove; 
    if (queue === "inProgress") { 
      toRemove = {
        interested: jobId,
        complete: jobId 
      }
    } else if (queue === "complete") {
      toRemove = { 
        interested: jobId,
        inProgress: jobId 
      }
    } else if (queue === "interested") {
      toRemove = {
        inProgress: jobId,
        complete: jobId
      }
    }
    
    Users.findOneAndUpdate({ _id: req.params.userid },
      { $push: toAdd, $pull: toRemove },
      { new: true })
      .populate('interested inProgress complete jobContent')
      .exec((err, user) => {
        if (err) { console.log(`Error: ${err}`) }
      })
      .then(user => {
        console.log('popd post-move user:', user);
        res.send(user);
      })
      .catch(error => {
        throw error;
      });
  })
  .delete((req, res) => {
    let queue = req.params.queue;
    let jobId = req.params.jobid;
    let toDelete = {};
    toDelete[queue] = jobId;

    JobContent.findOneAndRemove( { user_id: req.params.userid, job_id: jobId },
      (err, content) => {
        Users.findOneAndUpdate( { _id: req.params.userid },
          { $pull: toDelete },
          { new: true })
        .populate('interested inProgress complete jobContent')
        .exec((err, user) => {
          if (err) { console.log(`Error: ${err}`) }
        })
        .then(user => {
          console.log('popd post-delete user:', user);
          res.send(user);
        })
        .catch(err => {
          throw err;
        })
      }
    );
  });

// Adding notes to jobcontent
router.post('/:userid/:jobid/:content', (req, res) => { 
  console.log("it workkssss"); 
  let userid = req.params.userid; 
  let jobid  = req.params.jobid; 
  let content = req.params.content; 
  console.log("the user_id", userid, "jobid", jobid, "content", content); 
JobContent.findOneAndUpdate({ "user_id": userid, "job_id":jobid },{$push:{"notes":content}})
.then(user =>{
    console.log("hellooo responseee in ", user); 
    res.send(user);
  }).catch(err =>{
    console.log("helloo errr", err);
  })


 
}) 

//POST route for job content is not needed because new jobContent is created at the moment the job is saved (see job POST route).  All updates to job content should be PUT requests
router.post('/:userid/jobs/:jobid/content', (req, res) => {

});

//PUT update job content specific to a user's job
router.put('/:userid/jobs/:jobid/content', (req, res) => {
  let userId = req.params.userid;
  let jobId = req.params.jobid;
  //as with the PUT user route, will provide data in the body about the specific information to be updated
  let toUpdate = {};
  for (key in req.body) {
    toUpdate[key] = req.body[key];
  }
  JobContent.findOneAndUpdate({ user_id: userId, job_id: jobId },
    toUpdate,
    { new: true },
    (err, jobContent) => {
      if (err) { console.log(`Error in jobContent PUT: ${err}`); }
      // res.send(jobContent);
      Users.findOne({ _id: userId }, (user) => {
        res.send(user);
      });
    }
  );
});

module.exports = router;
