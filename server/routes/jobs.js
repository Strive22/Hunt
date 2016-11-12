const express = require('express');
const router = express.Router();
const path = require('path');
const Users = require('../models/users');
const Jobs = require('../models/jobs');
const JobContent = require('../models/jobContent');

//GET get a job
router.get('/:jobid', (req, res) => {
  Jobs.findOne({ _id: req.params.jobid })
  .then(job => {
    res.send(job);
  })
})

//PUT update a job
router.put('/:jobid', (req, res) => {
  let toUpdate = {};
  for (key in req.body) {
    toUpdate[key] = req.body[key];
  }
  Jobs.findOneAndUpdate({ _id: req.params.jobid }, toUpdate, { new: true },
    (err, job) => {
      if (err) console.log(`Error in updating job: ${err}`);
      res.send(job);
    }
  )

})