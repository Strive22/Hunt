#! /usr/bin/env node
require('dotenv').config({silent: true});

const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const db = require('./config/db');
const User = require('./models/users');

const routes = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');
const search = require('./routes/search');
const connect = require('./routes/Connect');
const fallback = require('./routes/fallback');

const app = express();
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

//the express session has to be instantiated before the passport session (see passportjs.org/docs/configure)
app.use(session({ 
  //used to sign the session ID cookie
  secret: 'huntersrule',
  resave: true,
  //force new both not modified sessions (uninitialized) to save to the store
  saveUninitialized: true
}))

//this calls the passport and session initialization
require('./config/passport')(app);

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);
app.use('/search', search);
app.use('/connect',connect);
// app.use('*', fallback);

//404 handler
app.use((req, res, next) => {
  let err = new Error(`404: ${req.originalUrl} Not Found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({
    message: err.message,
    error: err
  });
});


const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  //when the server starts let's insert a dummy user
  User.findOne({name: 'Brittany'}, (err, user) => {
    if (!user) {
      var brit = new User({
        name: 'Brittany',
        email: 'myEmail@gmail.com',
        location: 'Austin, Texas',
        tech: 'Javascript',
        otherHunters: true
      });
      brit.save((error, data) => {
        if (error) console.log('err saving:', error);
        else console.log('saved:', data);
      });
    }
  });
});

module.exports = app;
