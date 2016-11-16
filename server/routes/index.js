const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/users');

function checkIfLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('Not Logged In')
  res.redirect('/landing');
}

router.get('/', checkIfLoggedIn, (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/app.html'));
});

router.get('/login', (req, res, next) => {
  User.findById(req.user._id)
    .populate('interested inProgress complete jobContent')
    .exec((err, result) => {
      if (err) console.log(`Error: ${err}`)
    })
    .then(user => {
      res.send(user);
    })
})

router.get('/landing', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/landing.html'));
})

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/landing');
});


module.exports = router;
