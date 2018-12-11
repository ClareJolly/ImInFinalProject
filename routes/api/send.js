const express = require('express');
const router = express.Router();
const accountSid = require('../../config/keys').accountSid;
const mobileNumber = require('../../config/keys').mobileNumber;
const authToken = require('../../config/keys').authToken;
var twilio = require('twilio');

var client = new twilio(accountSid, authToken);


router.post('/', (req, res) => {
  var messageBody = " you have been invited from "+req.body.teamName+" event at "+req.body.eventPlace+" on "+req.body.eventDate+" at "+req.body.eventTime+"."

  for (var i = 0; i<2; i++){
    client.messages.create({
      to: mobileNumber,
      from: "+441604422099",
      body: "Hi "+ req.body.invitees[i].part_name+messageBody,}, function(err,message) {
        console.log(message.sid);
      });
    }
})
module.exports = router;
