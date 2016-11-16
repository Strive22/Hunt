const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');


router.route('/')
  .get(passport.authenticate('google', { 
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/drive.readonly'
    ]
  }));

router.route('/callback')
  .get(passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/landing',
  }));

module.exports = router;
