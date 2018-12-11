const express = require('express');
const router = express.Router();
const accountSid = require('../../config/keys').accountSid;
const authToken = require('../../config/keys').authToken;
var twilio = require('twilio');

var client = new twilio(accountSid, authToken);


router.post('/', (req, res) => {
  client.messages.create({
     to: "+447810841484",
     from: "+441604422099",
     body: "hello",}, function(err,message) {
     console.log(message.sid);
  });
});

module.exports = router;
