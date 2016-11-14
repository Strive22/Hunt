const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');

router.get('/', 
  passport.authenticate('google', 
    { scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/drive.readonly'
    ]})
);

router.get('/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/landing',
}));

module.exports = router;
