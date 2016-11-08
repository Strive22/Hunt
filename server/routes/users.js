const express = require('express');
const router = express.Router();
const path = require('path');

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

module.exports = router;
