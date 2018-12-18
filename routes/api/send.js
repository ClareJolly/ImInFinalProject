const express = require('express');
const router = express.Router();
const accountSid = require('../../config/keys').accountSid;
const mobileNumber = require('../../config/keys').mobileNumber;
const sendfrom = require('../../config/keys').sendfrom;
const authToken = require('../../config/keys').authToken;
const receiveTestsAccountSid = require('../../config/keys').receiveTestsAccountSid;
const receiveTestAuthToken = require('../../config/keys').receiveTestAuthToken;
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser')
const axios = require('axios');
// const http = require('http');
var twilio = require('twilio');

var client = new twilio(accountSid, authToken);


router.post('/', (req, res) => {
  var eventDetails = " you have been invited from "+req.body.teamName+" to an event at "+req.body.eventPlace+" on "+req.body.eventDate+" at "+req.body.eventTime

  var messageBody =  eventDetails + ". If you would like to attend, please reply with your shortcode followed by IN or OUT. Your shortcode is "

  var messageBodyPaid = eventDetails + ". Please pay £"+req.body.eventPricePP+" by "+req.body.payByDate+". If you would like to attend, please pay on url/"

  if (req.body.eventPricePP === "0"){
  for (var i = 0; i<req.body.invitees_new.length; i++){
    client.messages.create({
      to: req.body.invitees_new[i].part_number,
      from: sendfrom,
      body: "Hi "+ req.body.invitees_new[i].part_nam+messageBody+req.body.invitees_new[i].short_id,}, function(err,message) {
      });
    }
    }
    else{
      for (var i = 0; i<req.body.invitees_new.length; i++){
        client.messages.create({
          to: req.body.invitees_new[i].part_number,
          from: sendfrom,
          body: "Hi "+ req.body.invitees_new[i].part_name+messageBodyPaid+req.body.invitees_new[i].short_id + "or reply with your shortcode followed by OUT. Your shortcode is "+ req.body.invitees_new[i].short_id,}, function(err,message) {
          });
    }
  }
})

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/sms', (req, res) => {

  const twiml = new MessagingResponse();
  const body = req.body.Body
  const from = req.body.From
  console.log(body)
  var url = "http://localhost:5000/api/db/inv/"
  if (body.includes(" IN")){
    var message_short_IN = body.replace(" IN","")
    console.log("***"+body.replace(" IN","")+"***")
    // setResponse(message_short_IN,"IN")
    var message_res_IN = {response:"IN"}
    // fetch()
    axios.patch(url+message_short_IN, message_res_IN)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    twiml.message('Great see you there!');
  }
  else if (body.includes(" OUT")) {
    var message_short_OUT = body.replace(" OUT","")
    console.log(body.replace(" OUT",""))
    // setResponse(message_short_OUT,"OUT")
    var message_res_OUT = {"response":"OUT"}
    axios.patch(url+message_short_OUT, message_res_OUT)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    twiml.message('Sorry to hear you can not make it!');
  }
  else {
    twiml.message('Please Reply IN or OUT!');
  }
 // console.log(res.Parameters.From)
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});


module.exports = router;




// router.get('/', (req, res) => {
//
// })
