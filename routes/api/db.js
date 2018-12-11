const express = require('express');
const router = express.Router();

const Participant = require('../../models/Participants');

router.post('/', (req, res) => {
  const newParticipant = new Participant({
    participants: req.body.participants,
    teamName: "Test Team",
    eventTime: "10:00",
    eventPlace: "St Pauls Academy",
    eventDate: "25/12/18",
    message: "Hi"
  });

  newParticipant.save().then(post => res.json(post));
});

router.get('/', (req, res) => {
  Participant.find()
    .sort({ date: -1})
    .then(items => res.json(items));
});

router.delete('/:id', (req, res) => {
  Participant.findById(req.params.id).then(participant =>
    participants.remove().then(() => res.json({ success: true }))
  )
  .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
