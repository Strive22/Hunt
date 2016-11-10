const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobsSchema = new Schema({
  // _id: String,
  api: String,
  apiSpecificId: String,
  title: String,
  company: String,
  location: String,
  link: String,
  description: String
});

var Jobs = mongoose.model('Jobs', jobsSchema);
module.exports = Jobs;