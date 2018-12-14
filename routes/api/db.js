const express = require('express');
const router = express.Router();
const Events = require('../../models/Events');
const Invitees = require('../../models/Invitees');

// router.post('/', (req, res) => {
//   const newEvents = new Events({
//     invitees: req.body.invitees,
//     teamName: req.body.teamName,
//     eventTime: req.body.eventTime,
//     eventPlace: req.body.eventPlace,
//     eventDate: req.body.eventDate,
//     message: req.body.message
//   });
//   newEvents.save().then(event => res.json(event));
// });

router.post('/', (req, res) => {

function addAllInvitees () {

  arr = []
  for (var i = 0; i<req.body.invitees.length; i++){
    console.log(req.body.invitees[i])
    const newInvitee = new Invitees({
     part_name: req.body.invitees[i].part_name,
     part_number: req.body.invitees[i].part_number,
     response: 'NONE',
     unique_code: '1234',
     event_ID: '1'
   });
   newInvitee.save().then(invitee => res.json(invitee))
   .then(arr.push(newInvitee._id))
  }
  return arr
}


var promise1 = new Promise(
    function (resolve, reject) {
        invitees_new = addAllInvitees()
            resolve(invitees_new); // fulfilled
        }


);

promise1.then(function(value) {
  // console.log(value);
  addEvent(req.body.invitees,value,req.body.teamName,req.body.eventTime,req.body.eventPlace,req.body.eventDate,req.body.message)
  // expected output: "foo"
});
// promise1.then()

function addEvent(invitees,invitees_new,teamName,eventTime,eventPlace,eventDate,message) {
  console.log('and now the main event')
  const newEvents = new Events({
    invitees: invitees,
    invitees_new: invitees_new,
    teamName: teamName,
    eventTime: eventTime,
    eventPlace: eventPlace,
    eventDate: eventDate,
    message: message
  });
  newEvents.save().then(event => res.json(event));
}

});

router.get('/inv', (req, res) => {
  Invitees.find()
    .sort({ date: -1})
    .then(invitee => res.json(invitee));
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
    event.eventTime = req.body.eventTime;
    event.eventPlace = req.body.eventPlace;
    event.teamName = req.body.teamName;
    event.message = req.body.message;
    event.save(function (err, updatedEvent) {
  if (err) return handleError(err);
     res.send(updatedEvent);
   });
 });
});

module.exports = router;
