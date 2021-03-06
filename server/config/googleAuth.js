const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('../models/users');

module.exports = () => {
  const strategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.HOST}/auth/callback`,
    passReqToCallback: true
  }, (req, accessToken, refreshToken, profile, done) => {
    Users.findOne({ name: profile.displayName })
    .then(user => {
      if (user) {
        console.log('User found.')
        done(null, user);
      } else {
        console.log('User not found - Adding to database');
        console.log('profile:', profile)

        let imageUrl = '';
        if (profile.photos && profile.photos.length) {
          imageUrl = profile.photos[0].value;
        }

        new Users({
          name: profile.displayName,
          email: profile.emails[0].value,
          image: imageUrl,
          accessToken: accessToken,
          refreshToken: refreshToken
        }).save(err => {
          console.log('error saving new user:', err);
        })
        done(null, user);
      }
    })
    .catch(err => {
      throw err;
    })
  })
  passport.use(strategy);
  refresh.use(strategy);
}
