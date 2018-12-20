const express = require('express');
const router = express.Router();
const Events = require('../../models/Events');
const Invitees = require('../../models/Invitees');
const Users = require('../../models/Users');
const bcrypt = require('bcrypt');
const axios = require('axios');


// Event Database
router.post('/', (req, res) => {

  //Promise A = add the invitees to the collection
  function promiseA() {
      return new Promise((resolve, reject) => {
        invitees_new = addAllInvitees()
            return resolve(invitees_new);
      });
  }

  //Promise B = add the main event details to the collection (including invitees)
  function promiseB(data) {
    return new Promise((resolve, reject) => {
        var event_add = addEvent(
          req.body.user_id,
          req.body.invitees,
          data,
          req.body.teamName,
          req.body.eventTime,
          req.body.eventPlace,
          req.body.eventDate,
          req.body.payByDate,
          req.body.eventPricePP)
        resolve(event_add);
    });
  }

  //combine the promises together to run in order
  promiseA('a','b')
    .then(promiseB)
    // .then(promiseC)
    .catch(function(error) {
    console.log('Unexepected error has occured');
  });

  //function to add invitees
  function addAllInvitees () {

    arr = []
    for (var i = 0; i<req.body.invitees.length; i++){
      var vodaphoneNum = '+44' + req.body.invitees[i].part_number.replace(/^0/,'');
      const newInvitee = new Invitees({
      part_name: req.body.invitees[i].part_name,
      part_number: vodaphoneNum,
      eventPricePP: req.body.invitees[i].eventPricePP,
      response: 'NO REPLY',
      unique_code: 'NONE',
      event_ID: 'NONE',
      payment_confirmed: "N",
      payment_details: '{}'
     });
     newInvitee.save()
     .then(arr.push(newInvitee._id))
    }
    return arr
  }

  //function to add event details
  function addEvent(user_id,invitees,invitees_new,teamName,eventTime,eventPlace,eventDate,payByDate, eventPricePP,message) {
    console.log('and now adding the main event')
    const newEvents = new Events({
      user_id: user_id,
      invitees: invitees,
      invitees_new: invitees_new,
      teamName: teamName,
      eventTime: eventTime,
      eventPlace: eventPlace,
      eventPricePP: eventPricePP,
      eventDate: eventDate,
      payByDate: payByDate,
      message: message
    });
    newEvents.save(function(err){
      return Events.findOne({ _id: newEvents._id })
      .sort({ date: -1})
      .populate('invitees_new').exec((err, invitees_new) => {
        return res.json(invitees_new);
      })
    });

    return invitees_new
  }

  // function to get event data
  function getEvent(id) {
    console.log('getting the event data')
    return Events.findOne({ _id: id })
      .sort({ date: -1})
      .populate('invitees_new').exec((err, invitees_new) => {
        return res.json(invitees_new);
      })
  }

});

// get all invitees
router.get('/inv', (req, res) => {
  Invitees.find()
    .sort({ date: -1})
    .then(invitee => res.json(invitee));
});

//update invitee by short ID
router.patch('/inv/:short_id', (req, res) => {
  var query = {short_id: req.params.short_id}
  console.log(req.params.short_id)
  Invitees.findOneAndUpdate(query, {response:req.body.response}, function (err, invitee) {
    if (err) return handleError(err);
    invitee.save(function (err, updatedInvitee) {
      if (err) return handleError(err);
      res.send(updatedInvitee);
    });
  });
});

//update payments by short ID
router.patch('/inv/payment/:short_id', (req, res) => {
  var query = {short_id: req.params.short_id}
  console.log(query)
  // Invitees.findOne(query, function (err, invitee){
  //   console.log("test: ",invitee)

  Invitees.findOneAndUpdate(query, {response: "IN", "payment_confirmed": req.body.payment_confirmed, "payment_details": req.body.payment_details}, function (err, invitee) {
    console.log("test: ",invitee)
    if (err) return handleError(err);
    invitee.save(function (err, updatedInvitee) {
      if (err) return handleError(err);
      res.send(updatedInvitee);
    });
  });
});
// { "payment_confirmed": "Y",
// "payment_details": "test" }


//get invitee by short ID
router.get('/inv/:short_id', (req, res) => {
  var query = {short_id: req.params.short_id}
  // console.log(req.params.short_id)
  Invitees.findOne(query, function (err, invitee) {
    if (err) return handleError(err);
    // console.log(invitee._id)
      res.send(invitee._id);
    });
});

// get all events
router.get('/', (req, res) => {

  Events.find()
  .sort({ date: -1})
  .populate('invitees_new').exec((err, invitees_new) => {
    return res.json(invitees_new);
  })
});

router.get('/event/user/:user_id', (req, res) => {

  Events.find({ user_id: req.params.user_id })
  .sort({ date: -1})
  .populate('invitees_new').exec((err, invitees_new) => {
    return res.json(invitees_new);
  })
});

// get individual event by ID
router.get('/event/:id', (req, res) => {
  return Events.findOne({ _id: req.params.id })
  .sort({ date: -1})
  .populate('invitees_new').exec((err, invitees_new) => {
    return res.json(invitees_new);
  })
});

// delete record by ID
router.delete('/:id', (req, res) => {
  Events.findById(req.params.id)
  .then(event =>
    event.remove().then(() => res.json({ success: true }))
  )
  .catch(err => res.status(404).json({ success: false }));
});

// update event by ID
router.patch('/:id', (req, res) => {
 Events.findById(req.params.id, function (err, event) {
   if (err) return handleError(err);
    event.invitees = req.body.invitees;
    event.eventDate = req.body.eventDate;
    event.payByDate = req.body.payByDate;
    event.eventTime = req.body.eventTime;
    event.eventPlace = req.body.eventPlace;
    event.eventPricePP = req.body.eventPricePP;
    event.teamName = req.body.teamName;
    event.message = req.body.message;
    event.save(function (err, updatedEvent) {
  if (err) return handleError(err);
     res.send(updatedEvent);
   });
 });
});

//patch balance request
router.patch('/event/balance', (req, res) => {
  var query = {_id: req.body.eventID}
  // console.log(req.params.short_id)
  Events.findOneAndUpdate(query, {balance_request_sent:true}, function (err, balanceset) {
    if (err) return handleError(err);
    balanceset.save(function (err, updatedBalanceStatus) {
      if (err) return handleError(err);
      res.send("updated Balance status");
    });
  });
});

// User Database
router.post('/user', (req, res) => {
  let hash = bcrypt.hashSync(req.body.password, 10);
  const newUsers = new Users({
    name: req.body.name,
    username: req.body.username,
    phoneNumber: req.body.phoneNumber,
    password: hash
  });
  newUsers.save().then(user => res.json(user));
});

// get all users
router.get('/user', (req, res) => {
  Users.find()
    .sort({ date: -1})
    .then(user => res.json(user));
});

// check username is available
router.post('/user/check-username', (req, res) => {
  query = { username: req.body.username }
  console.log(query)
  Users.findOne(query, function (err, checkuser) {
    var response
    checkuser === null ? response = "Y" : response = "N"
    res.send(response)
  })
})

// User login including decryption
router.post('/user/login', (req, res) => {

//check encrypted password
  function checkPassword(formpw, dbpw, userID){
    bcrypt.compare(formpw, dbpw, function(err, bcrypt_res) {
      if (bcrypt_res) {
        res.send({response:"YAY",userID:userID});
      } else {
        res.send({response:"NOPE",userID:userID});
      }
    });
  }

  // check DB for matching username
  query = { username: req.body.username }
  Users.findOne(query, function (err, checkuser) {
    if (checkuser != null) {
      checkPassword(req.body.password, checkuser.password, checkuser._id)
    } else {
      res.send("Username NOPE");
    }
  });

});

module.exports = router;
