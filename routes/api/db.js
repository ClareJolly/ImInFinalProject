const express = require('express');
const router = express.Router();
const Events = require('../../models/Events');
const Invitees = require('../../models/Invitees');
const Users = require('../../models/Users');
const bcrypt = require('bcrypt');
const axios = require('axios');
// Event Database
router.post('/', (req, res) => {

console.log("test")
function addAllInvitees () {

  arr = []
  for (var i = 0; i<req.body.invitees.length; i++){
    // console.log(req.body.invitees[i])
    var vodaphoneNum = '+44' + req.body.invitees[i].part_number.replace(/^0/,'');
    const newInvitee = new Invitees({
     part_name: req.body.invitees[i].part_name,
     part_number: vodaphoneNum,
     eventPricePP: req.body.invitees[i].eventPricePP,
     response: 'NONE',
     unique_code: '1234',
     event_ID: '1'
   });
   newInvitee.save()//.then(invitee => res.json(invitee))
   .then(arr.push(newInvitee._id))
  }
  return arr
}


var promise1 = new Promise(
    function (resolve, reject) {
        invitees_new = addAllInvitees()
            return resolve(invitees_new); // fulfilled
        }


);

// var promise2 = new Promise(
//     function (resolve, reject) {
//       // console.log(x)
//         var event_add = addEvent(req.body.invitees,req.body.teamName,req.body.eventTime,req.body.eventPlace,req.body.eventDate,req.body.message)
//             return resolve(event_add); // fulfilled
//         }
//
//
// );

// promise1.then(function(value) {
//   console.log("val:",value);
//   var event_add = addEvent(req.body.invitees,value,req.body.teamName,req.body.eventTime,req.body.eventPlace,req.body.eventDate,req.body.message)
//   // promise2.then(function(value) {
//   //     console.log(value)
//
//   })


  function promiseA() {
      return new Promise((resolve, reject) => {
        invitees_new = addAllInvitees()
            return resolve(invitees_new);
      });
  }

  function promiseB(data) {
    return new Promise((resolve, reject) => {
      // console.log("DATA:",data)
        var event_add = addEvent(req.body.invitees,data,req.body.teamName,req.body.eventTime,req.body.eventPlace,req.body.eventDate,req.body.payByDate, req.body.eventPricePP,req.body.message)
        resolve(event_add);
    });
  }

  // function promiseC(datax) {
  //   return new Promise((resolve, reject) => {
  //     console.log("DATA C:",datax)
  //     // var getEvent = getEvent(datax._id)
  //     var query = { _id: datax._id }
  //     // console.log("query)
  //     // console.log("query)
  //     console.log("query:",query)
  //     return Events.findOne(query)
  //     // .sort({ date: -1})
  //     .populate('invitees_new').exec((err, inv_new) => {
  //       console.log("Populated invitees " + inv_new)
  //       return inv_new;
  //     })
  //     // console.log("dddsds",invitees_new)
  //     // console.log("TEST")
  //       // var event_add = addEvent(req.body.invitees,data,req.body.teamName,req.body.eventTime,req.body.eventPlace,req.body.eventDate,req.body.message)
  //       resolve(x);
  //   });
  // }

  promiseA('a','b')
    .then(promiseB)
    // .then(promiseC)
    .catch(function(error) {
    console.log('Unexepected error has occured');
  });


// promise1.then(function(val){
//   console.log("val:",val)
//   axios.get('http://localhost:5000/api/db/'+val._id)
// .then(function (response) {
//   // console.log(response);
// })
// .catch(function (error) {
//   // console.log(error);
// });
// })

function addEvent(invitees,invitees_new,teamName,eventTime,eventPlace,eventDate,payByDate, eventPricePP,message) {
  console.log('and now adding the main event')
  const newEvents = new Events({
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
        // console.log("checking",newEvents.invitees_new);
        return Events.findOne({ _id: newEvents._id })
        .sort({ date: -1})
        .populate('invitees_new').exec((err, invitees_new) => {
          // console.log("Populated invitees " + invitees_new)
          return res.json(invitees_new);
        })
         // is just an object id
      // Events.populate(newEvents, {path:"invitees_new"}, function(err, newEvents) { ... });
        // I really want book._creator to be a user without having to go back to the db ... any suggestions?
    });
  //.then(event => res.json(event));
  // .then( event2 => res.json(event2);
  return invitees_new
}

function getEvent(id) {
  console.log('getting the event data')
  // const newEvents = new Events({
  //   invitees: invitees,
  //   invitees_new: invitees_new,
  //   teamName: teamName,
  //   eventTime: eventTime,
  //   eventPlace: eventPlace,
  //   eventDate: eventDate,
  //   message: message
  // });
  // newEvents.save().then(event => res.json(event));
  // .then( event2 => res.json(event2);

  // Events.find()
  // // return Events.findOne({ teamName: "NEW ASYNC NEWNEWNEWNEW TEST" })
  // .sort({ date: -1})
  // .populate('invitees_new').exec((err, invitees_new) => {
  //   // console.log("Populated invitees " + invitees_new)
  //   return res.json(invitees_new);
  // })

  return Events.findOne({ _id: id })
  .sort({ date: -1})
  .populate('invitees_new').exec((err, invitees_new) => {
    // console.log("Populated invitees " + invitees_new)
    return res.json(invitees_new);
  })
}

});

router.get('/inv', (req, res) => {
  Invitees.find()
    .sort({ date: -1})
    .then(invitee => res.json(invitee));
});

router.patch('/inv/:short_id', (req, res) => {
  var query = {short_id: req.params.short_id}
  console.log(req.params.short_id)
// Invitees.findOne({short_id: req.params.short_id}, function(err,obj) { return console.log("TEST",obj.short_id,obj._id); });
 Invitees.findOneAndUpdate(query, {response:req.body.response}, function (err, invitee) {
   if (err) return handleError(err);

    invitee.save(function (err, updatedInvitee) {
  if (err) return handleError(err);
     res.send(updatedInvitee);
   });
 });
});

router.get('/', (req, res) => {


  Events.find()
  // return Events.findOne({ teamName: "NEW ASYNC NEWNEWNEWNEW TEST" })
  .sort({ date: -1})
  .populate('invitees_new').exec((err, invitees_new) => {
    // console.log("Populated invitees " + invitees_new)
    return res.json(invitees_new);
  })
    // .sort({ date: -1})
    // .then(invitee => res.json(invitee));
});

router.get('/:id', (req, res) => {


  // Events.find()
  return Events.findOne({ _id: req.params.id })
  .sort({ date: -1})
  .populate('invitees_new').exec((err, invitees_new) => {
    // console.log("Populated invitees " + invitees_new)
    return res.json(invitees_new);
  })
    // .sort({ date: -1})
    // .then(invitee => res.json(invitee));
});

// router.get('/', (req, res) => {
//   Events.find()
//     .sort({ date: -1})
//     .then(event => res.json(event));
// });

router.delete('/:id', (req, res) => {
  Events.findById(req.params.id)
  .then(event =>
    event.remove().then(() => res.json({ success: true }))
  )
  .catch(err => res.status(404).json({ success: false }));
});

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

router.get('/user', (req, res) => {
  Users.find()
    .sort({ date: -1})
    .then(user => res.json(user));
});

router.post('/user/check-username', (req, res) => {
  query = { username: req.body.username }
  console.log(query)
  Users.findOne(query, function (err, checkuser) {
    var response
    checkuser === null ? response = "Y" : response = "N"
    res.send(response)
  })

})

router.post('/user/login', (req, res) => {

function checkPassword(formpw, dbpw, userID){
  bcrypt.compare(formpw, dbpw, function(err, bcrypt_res) {
    if (bcrypt_res) {
      // console.log("YAY")
      res.send({response:"YAY",userID:userID});

      // return  "successful login"
    } else {
      // console.log("NOPE")
      res.send({response:"NOPE",userID:userID});
      // return  "unsuccessful login"
    }
  });
}

  query = { username: req.body.username }
  Users.findOne(query, function (err, checkuser) {
    if (checkuser != null) {
      checkPassword(req.body.password, checkuser.password, checkuser._id)
    } else {
      // console.log("username NOPE")
      res.send("Username NOPE");
    }
  });

});

module.exports = router;
