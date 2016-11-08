#! /usr/bin/env node
require('dotenv').config({silent: true});

const express = require('express');
const path = require('path');

const db = require('./config/db');

const routes = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');
const search = require('./routes/search');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);
app.use('/search', search);

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
});

module.exports = app;