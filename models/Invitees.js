const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
// var date = new Date();

// Creat Schema
const InviteesSchema = new Schema({

  event_ID: {
    type: String,
    required: true
  },
  part_name: {
    type: String,
    required: true
  },
  part_number: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  unique_code: {
    type: String,
    required: true
  },
  short_id: {
  'type': String,
  'default': shortid.generate
}
});

// const Invitees = mongoose.model('Invitees', InviteesSchema, 'Invitees')

module.exports = Invitees = mongoose.model('Invitees', InviteesSchema);
