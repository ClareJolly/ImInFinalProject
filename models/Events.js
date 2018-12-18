const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var date = new Date();

// Creat Schema
const EventSchema = new Schema({
  invitees: {
    type: Array,
    required: true
  },
  // invitees_new: {
  //   type: Array,
  //   required: true
  // },
  invitees_new: [{ type: Schema.Types.ObjectId, ref: 'Invitees' }],

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
    required: false
  },
  eventPricePP: {
    type: String,
    required: true
  },
  payByDate: {
    type: String,
    required: true
  },
  user_id:{
    type: String,
    required: true
  }
});

module.exports = Event = mongoose.model('Events', EventSchema);
