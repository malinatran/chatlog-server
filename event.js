var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  user: String,
  type: String,
  message: String,
  otheruser: String
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;