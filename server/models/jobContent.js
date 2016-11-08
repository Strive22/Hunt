const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobContentSchema = new Schema({
  _id: String,
  user_id: String,
  job_id: String,
  notes: String,
  interview_date: String,
  app_sent_date: String
});

var JobContent = mongoose.model('JobContent', jobContentSchema);
module.exports = JobContent;