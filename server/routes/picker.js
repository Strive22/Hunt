const express = require('express');
const router = express.Router();
const path = require('path');
const refresh = require('passport-oauth2-refresh');
const User = require('../models/users');

router.put('/', (req, res) => {
  User.findById(userId)
  .then(user => {
    refresh.requestNewAccessToken('google', user.refreshToken, 
      (err, accessToken, refreshToken) => {
        res.send(accessToken);
    })
  })
})

module.exports = router;
