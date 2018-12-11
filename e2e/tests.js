const express = require('express');
const router = express.Router();
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let participants = require('../models/Participants.js');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe('Participants', () => {
  // Removes anything from the db before the tests are run
  beforeEach((done) => {
    participants.remove({}, (err) => {
      done();
    });
  });

  describe('/POST participants', () => {
    it('it should add a participants to the db', (done) => {
      let event = {
        invitees: ["Test name", "07876543213", "YES"],
        teamName: "Test Team",
        eventTime: "10:00",
        eventPlace: "St Pauls Academy",
        eventDate: "25/12/18",
        message: "Hi"
      }
      chai.request(server)
      .post('/api/db')
      .send(event)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.invitees[0]).to.equal("Test name");
        expect(res.body.invitees[1]).to.equal("07876543213");
        expect(res.body.invitees[2]).to.equal("YES");
        this.id = res.body._id
        console.log(this.id);
        done();
      });
    });
  });

  // Goes to the database and should not find anything in there
  describe('/GET participants', () => {
      it('it should GET all participants from db', (done) => {
        chai.request(server)
            .get('/api/db')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

//   describe('/DELETE/:id event', () => {
//     it('it should delete a event in the db', (done) => {
//       chai.request(server)
//       .delete('/api/db/' + this.id)
//       .end((err, res) => {
//         expect(res.statusCode).to.equal(200);
//         expect(res.body.success).to.equal(true);
//         done()
//       });
//     });
//   });
});
