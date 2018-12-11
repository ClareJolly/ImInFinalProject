const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var date = new Date();

// Creat Schema
const ParticipantSchema = new Schema({
  participants: {
    type: Array,
    required: true
  },

  teamName: {
    type: String,
    required: true
  },
  eventTime: {
    type: String,
    required: true
  },
  eventPlace: {
    type: String,
    required: true
  },
  eventDate: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

module.exports = Participant = mongoose.model('participants', ParticipantSchema);
