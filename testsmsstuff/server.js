const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  const body = req.body.Body
  console.log(req)
  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
