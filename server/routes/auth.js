const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');

router.route('/')
  .get(passport.authenticate('google', {
      scope: ['profile', 'email']
  }));

router.route('/callback')
  .get(passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/landing',
  }));

module.exports = router;
