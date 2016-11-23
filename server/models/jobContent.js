const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobContentSchema = new Schema({
  user_id: String,
  job_id: String,
  notes: String,
  interview_date: String,
  app_sent_date: String,
  resume_complete: Boolean,
  cover_letter_complete: Boolean
});

var JobContent = mongoose.model('JobContent', jobContentSchema);
module.exports = JobContent;