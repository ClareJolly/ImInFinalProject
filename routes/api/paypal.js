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
});

// pay page to call PayPal AIP
router.post('/pay', (req, res) => {
  console.log(req.body.price.toString())
  var price = req.body.price.toString()
    console.log(typeof price)
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://5e4fec46.ngrok.io/api/paypal/success?p=" + price ,
        "cancel_url": "http://5e4fec46.ngrok.io/api/paypal/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": req.body.event_ID,
                "sku": req.body.short_id,
                "price": price,
                // price2,
                "currency": "GBP",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "GBP",
            "total": price
        },
        "description": "req.body.manager_ID"
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
        "total": req.query.p
      }
    }]
  };

  paypal.payment.execute(paymentID, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error, payment);
      throw error;
    } else {
      console.log(JSON.stringify(payment));
      var sku = payment["transactions"][0]["item_list"]["items"][0]["sku"]
      console.log(sku)
      var payamentupdate = {
  	"payment_confirmed": "Y",
     "payment_details": payment["transactions"][0]
  }
      axios.patch("http://5e4fec46.ngrok.io/api/db/inv/payment/"+sku, payamentupdate)
      .then(function (response) {
        console.log(response);
      })
    }
  });

  res.render('success')
});

// cancel page
router.get('/cancel', (req, res) => res.render('cancel'));

module.exports = router;
