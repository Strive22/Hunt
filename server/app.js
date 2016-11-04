#! /usr/bin/env node
require('dotenv').config({silent: true});

const express = require('express');
const path = require('path');

const db = require('./config/db');

const app = express();

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../server/public/app.html'));
})

//Catch-all route - MUST BE AT END - to handle unexpected use cases in React Router
//Will serve the app.html file if another file is not found on the server
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/server', '/public', 'app.html'))
})

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;