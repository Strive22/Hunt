#! /usr/bin/env node
require('dotenv').config({silent: true});

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const db = require('./config/db');
const User = require('./models/users');

const routes = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');
const search = require('./routes/search');
const fallback = require('./routes/fallback');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.session({ 
  secret: 'huntersruleyall' 
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);
app.use('/search', search);
app.use('*', fallback);

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
