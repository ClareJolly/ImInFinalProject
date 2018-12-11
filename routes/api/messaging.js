
var accountSid = 'AC9a63ca3570c9734c0beb2f00367ca28c'; // Your Account SID from www.twilio.com/console
var authToken = '1c7a7e432080b4c80c326eec7d9f3409';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');

var client = new twilio(accountSid, authToken);


// 
// client.messages.create({
//    to: "+447810841484",
//    from: "+441604422099",
//    body: "hello",}, function(err,message) {
//    console.log(message.sid);
// });

// client.messages.create({
//     body: 'This is a test API',
//     to: '+447810841484',  // Text this number
//     from: '+12345678901'
//     // From a valid Twilio number
// })
// .then((message) => console.log(message.sid));
// });
// // At the bottom to make this accessible
// module.exports = router;
