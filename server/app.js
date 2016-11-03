#! /usr/bin/env node
require('dotenv').config({silent: true});

const express = require('express');
const path = require('path');

const db = require('./config/db');

const app = express();

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../server/public/app.html'));
})

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;