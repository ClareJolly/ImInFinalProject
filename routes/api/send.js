const express = require('express');
const router = express.Router();
const accountSid = require('../../config/keys').accountSid;
const mobileNumber = require('../../config/keys').mobileNumber;
const authToken = require('../../config/keys').authToken;
const receiveTestsAccountSid = require('../../config/keys').receiveTestsAccountSid;
const receiveTestAuthToken = require('../../config/keys').receiveTestAuthToken;
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser')
// const http = require('http');
var twilio = require('twilio');

var client = new twilio(accountSid, authToken);


router.post('/', (req, res) => {
  console.log(req.body)
  var messageBody = "You have been invited from "+req.body.teamName+" event at "+req.body.eventPlace+" on "+req.body.eventDate+" at "+req.body.eventTime+""

  for (var i = 0; i<req.body.invitees_new.length; i++){
    console.log("test2")
    // console.log(mobileNumber)
    client.messages.create({
      to: mobileNumber,
      from: "+441604422099",
      body: "Hi "+ req.body.invitees_new[i].part_name+messageBody+". Please reply IN or OUT, with your short code attached. Your shortcode:"+req.body.invitees_new[i].short_id+"",}, function(err,message) {
        console.log(message.sid);
      });
    }
})

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  const body = req.body.Body
  console.log(body)
  if (body === "IN"){
    twiml.message('Great see you there!');
  }
  else if (body === "OUT") {
    twiml.message('Sorry to hear you can not make it!');
  }
  else {
    twiml.message('Please Reply IN or OUT!');
  }
 console.log(res.Parameters.From)
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});


module.exports = router;




// router.get('/', (req, res) => {
//
// })
