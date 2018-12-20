const express = require('express');
const router = express.Router();
const accountSid = require('../../config/keys').accountSid;
const mobileNumber = require('../../config/keys').mobileNumber;
const sendfrom = require('../../config/keys').sendfrom;
const authToken = require('../../config/keys').authToken;
const receiveTestsAccountSid = require('../../config/keys').receiveTestsAccountSid;
const receiveTestAuthToken = require('../../config/keys').receiveTestAuthToken;
const emailUser = require('../../config/keys').emailUser;
const emailPass = require('../../config/keys').emailPass;

const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser')
const axios = require('axios');
// const http = require('http');
var twilio = require('twilio');
const nodemailer = require('nodemailer');

var client = new twilio(accountSid, authToken);


router.post('/', (req, res) => {

  if (req.body.eventPricePP === "0"){
  for (var i = 0; i<req.body.invitees_new.length; i++){
    client.messages.create({
      to: req.body.invitees_new[i].part_number,
      from: sendfrom,
      body: "Hi "+ req.body.invitees_new[i].part_name+", your invited to "+req.body.teamName+" on "+req.body.eventDate+" at "+req.body.eventTime+". To attend reply " +req.body.invitees_new[i].short_id + " IN or reply "+req.body.invitees_new[i].short_id +" OUT if not.",}, function(err,message) {
      });
    }
    }
    else{
      for (var i = 0; i<req.body.invitees_new.length; i++){
        client.messages.create({
          to: req.body.invitees_new[i].part_number,
          from: sendfrom,
          body: "Hi "+ req.body.invitees_new[i].part_name+", your invited to "+req.body.teamName+" on " + req.body.eventDate+ " at "+req.body.eventTime+ ". To attend pay £" +req.body.eventPricePP+ " on http:// or reply "+req.body.invitees_new[i].short_id + " OUT if not."}, function(err,message) {
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


router.post('/email', (req, res) => {

  // 'use strict';
  //

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        //IMINEventPlanner@gmail.com
          // host: 'smtp.ethereal.email',
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
              user: emailUser, // generated ethereal user
              pass: emailPass // generated ethereal password
          }
      });

      messageHTML = '<b>Please send me my balance for event ID '+req.body.eventID+'</b>'
      messageHTML += '<p>My account ID is: '+req.body.manager_id+' and my paypal email address is '+req.body.paypal_email+''
      if (req.body.request_message != ''){
        messageHTML += '<p>'+req.body.request_message+'</p>'
      }

      // setup email data with unicode symbols
      let mailOptions = {
          from: '"IMIN Event Planner 👻" <foo@example.com>', // sender address
          to: 'IMINEventPlanner@gmail.com, '+req.body.paypal_email+'', // list of receivers
          subject: 'Please send me my balance for event ID '+req.body.eventID+'', // Subject line
          text: 'Hello world?', // plain text body
          html: messageHTML // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          http://localhost:5000/api/db/event/balance

          axios.patch('http://localhost:5000/api/db/event/balance', {"eventID":req.body.eventID})
          .then(function (response) {
            console.log("done");
          })
          .catch(function (error) {
            console.log(error);
          });
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
  });
res.send("email sent");

})

module.exports = router;




// router.get('/', (req, res) => {
//
// })
