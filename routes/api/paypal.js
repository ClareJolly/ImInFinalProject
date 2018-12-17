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

pay.set('view engine', 'ejs');

router.get('/', (req, res) => res.render('index'));


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
                "price": "3.00",
                "currency": "GBP",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "GBP",
            "total": "3.00"
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

router.get('/success', (req, res) => {
  const payerID = req.query.PayerID;
  const paymentID = req.query.paymentId

  const execute_payment_json = {
    "payer_id": payerID,
    "transactions": [{
      "amount": {
        "currency": "GBP",
        "total": "3.00"
      }
    }]
  };

  paypal.payment.execute(paymentID, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error, response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));
      res.send(JSON.stringify(payment["transactions"][0]))
    }
  });
});

router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;
