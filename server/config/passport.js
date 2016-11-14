const passport = require('passport');

module.exports = function(app) {

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, cb) => {
    done(null, user);
  })

  passport.deserializeUser((obj, cb) => {
    done(null, obj);
  })

  //done initializing passport and the session, now let's call the google auth strategy 
  require('./googleAuth')();
};


