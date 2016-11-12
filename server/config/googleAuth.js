const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('../models/users');

module.exports = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.HOST}/return`
  }, (accessToken, refreshToken, profile, cb) => {
    Users.findOne({ name: profile.displayName }).then(user => {
      if (user) {
        console.log('User found.')
        cb(null, user);
      } else {
        console.log('User not found - Adding to database');
        console.log('profile:', profile)

        let imageUrl = '';
        if (profile.photos && profile.photos.length) {
          imageUrl = profile.photos[0].value;
        }

        new Users({
          name: profile.displayName,
          email: profile.email,
          image: imageUrl
        }).save(err => {
          console.log('error saving new user:', err);
        })
        cb(null, user)
      }
    })
    .catch(err => {
      throw err;
    })
  }))
}

passport.serializeUser((user, cb) => {
  cb(null, user);
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
})
