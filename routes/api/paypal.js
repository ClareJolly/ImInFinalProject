const client_id = require('./config/keys').client_id;
const receiver = require('./config/keys').receiver;
const client_secret = require('./config/keys').client_secret;
const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': client_id,
  'client_secret': client_secret
});

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

var sender_batch_id = Math.random().toString(36).substring(9);

app.get('/pay', (req, res) => {
  const create_payout_json = {
    "sender_batch_header": {
        "sender_batch_id": client_id,
        "email_subject": "You have a payment"
    },
    "items": [
        {
            "recipient_type": "EMAIL",
            "amount": {
                "value": 0.90,
                "currency": "GBP"
            },
            "receiver": receiver,
            "note": "Thank you.",
            "sender_item_id": "item_3"
        }
    ]
};

var sync_mode = 'true';

paypal.payout.create(create_payout_json, sync_mode, function (error, payout) {
  if (error) {
      throw error;
  } else {
    console.log("Create Single Payout Response");
      console.log(payout);
  }

});

});

var payoutId = "R3LFR867ESVQY";

paypal.payout.get(payoutId, function (error, payout) {
    if (error) {
        console.log(error);
        throw error;
    } else {
        console.log("Get Payout Response");
        console.log(JSON.stringify(payout));
    }
});

app.get('/cancel', (req, res) => res.send('Cancelled'));

app.listen(3000, () => console.log('Server Started'));
