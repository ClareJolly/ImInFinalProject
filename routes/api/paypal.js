const client_id = require('../../config/keys').client_id;
const receiver = require('../../config/keys').receiver;
const client_secret = require('../../config/keys').client_secret;
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');
var pay = express()
var path = require('path')

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': client_id,
  'client_secret': client_secret
});

// main payment page - with short ID
router.get('/confirm/:id', (req, res) => {
  id = req.params.id

  res.render('index')
  // var allData = ''
  // var test = 'test A'
  //
  // // function getData(id) {
  //   getResults = axios.get('http://localhost:5000/api/db/')
  //        .then(function (response) {
  //        codeArr = []
  //        for (var i = 0 ; i < response.data.length; i++){
  //
  //            for (var x = 0 ; x< response.data[i].invitees_new.length; x++){
  //              // console.log(response.data[i].invitees_new[x].short_id)
  //              shortID = response.data[i].invitees_new[x].short_id.toString()
  //              // console.log(shortID)
  //              codeArr.push({'shortID':shortID,'eventID': response.data[i]._id,'all': response.data[i]})
  //            }
  //        };
  //
  //        // console.log(codeArr)
  //        r = codeArr.find(obj => obj.shortID === id)
  //        allData = r
  //        console.log(test)
  //        helloworld(allData,test)
  //        .then(console.log("testb?",test))
  //
  //        // console.log("ALL:",allData)
  //          return allData
  //        })
  //        .catch(function (error) {
  //          return error
  //        });
  //
  //
  // // }
  //
  // function helloworld(arr,test) {
  //   test = 'testB'
  //   return test
  //   // console.log(arr)
  // }


//   promiseA(id,'b')
//     .then(promiseB)
//     // .then(promiseC)
//   //   .catch(function(error) {
//   //   console.log('Unexepected error has occured');
//   // }
// .then(console.log(promiseB._id));
//
//   function promiseA(id) {
//     // console.log("ID",id)
//      return new Promise((resolve, reject) => {
//        getResults = axios.get('http://localhost:5000/api/db/inv/'+id)
//             .then(function (response) {
//               // console.log(response.data)
//               return response.data
//             })
//             .catch(function (error) {
//               return error
//             });
//
//            return resolve(getResults);
//      });
//  }
//
//  function promiseB(result) {
//    return new Promise((resolve, reject) => {
//      getResults = axios.get('http://localhost:5000/api/db/')
//           .then(function (response) {
//           codeArr = []
//           for (var i = 0 ; i < response.data.length; i++){
//
//               for (var x = 0 ; x< response.data[i].invitees_new.length; x++){
//                 // console.log(response.data[i].invitees_new[x].short_id)
//                 shortID = response.data[i].invitees_new[x].short_id.toString()
//                 // console.log(shortID)
//                 codeArr.push({'shortID':shortID,'eventID': response.data[i]._id,'all': response.data[i]})
//               }
//           }
//
//           // console.log(codeArr)
//           r = codeArr.find(obj => obj.shortID === id)
//           allData = r
//           // console.log("ALL:",allData)
//             return allData
//           })
//           .catch(function (error) {
//             return error
//           });
//
//        return resolve(allData);
//    });
//  }
//
// console.log("ALL:",allData)


});

// pay page to call PayPal AIP
router.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:5000/api/paypal/success",
        "cancel_url": "http://localhost:5000/api/paypal/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "The Event Name",
                "sku": "unique code",
                "price": "0.10",
                "currency": "GBP",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "GBP",
            "total": "0.10"
        },
        "description": "The message that the Manager wants to have"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0; i < payment.links.length; i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

});

// success page
router.get('/success', (req, res) => {
  const payerID = req.query.PayerID;
  const paymentID = req.query.paymentId

  const execute_payment_json = {
    "payer_id": payerID,
    "transactions": [{
      "amount": {
        "currency": "GBP",
        "total": "0.10"
      }
    }]
  };

  paypal.payment.execute(paymentID, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error, response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));
      // res.send(JSON.stringify(payment["transactions"][0]))
    }
  });

  res.render('success')
});

// cancel page
router.get('/cancel', (req, res) => res.render('cancel'));

module.exports = router;
