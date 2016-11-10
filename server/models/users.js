const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  // _id: String,
  name: String,
  email: String,
  location: String,
  tech: String,
  otherHunters: Boolean,
  interested: [{ type: Schema.Types.ObjectId, ref: 'Jobs' }],
  inProgress: [{ type: Schema.Types.ObjectId, ref: 'Jobs' }],
  complete: [{ type: Schema.Types.ObjectId, ref: 'Jobs' }],
  jobContent: [{ type: Schema.Types.ObjectId, ref: 'JobContent' }]
});

var Users = mongoose.model('Users', usersSchema);
module.exports = Users;