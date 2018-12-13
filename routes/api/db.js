const express = require('express');
const router = express.Router();
const Events = require('../../models/Events');
const Users = require('../../models/Users');
const bcrypt = require('bcrypt');
// Event Database
router.post('/', (req, res) => {
  const newEvents = new Events({
    invitees: req.body.invitees,
    teamName: req.body.teamName,
    eventTime: req.body.eventTime,
    eventPlace: req.body.eventPlace,
    eventDate: req.body.eventDate,
    message: req.body.message
  });
  newEvents.save().then(event => res.json(event));
});

router.get('/', (req, res) => {
  Events.find()
    .sort({ date: -1})
    .then(event => res.json(event));
});

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

module.exports = router;
