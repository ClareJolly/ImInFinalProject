import React, { Component } from 'react';

import './Newevent.css';

// import axios from 'axios'
import './App.css';
import Invitees from './Invitees'
import TeamForm from './TeamForm'
import EventForm from './EventForm'

class Newevent extends Component {

  constructor(props){
    super(props);
    this.state = {
      teamName : '',
      eventPlace : '',
      eventDate : '',
      eventTime : '',
      message : '',
      invitees : [],
      stage:0
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  setTeamName = (name) => {
    this.setState({
      teamName:name
    })
  }

  incrementStage = () => {
    var stage = this.state.stage
    var nextStage = stage + 1
    this.setState({
      stage: nextStage
    })
  }

  Stage1Submit = (teamName) => {
    this.incrementStage()
    this.setTeamName(teamName)
    // console.log(this.state.stage)
  }

  Stage2Submit = (invitees) => {
    this.incrementStage()
    this.updateInvitees(invitees)
    // console.log(this.state.stage)
  }

  updateInvitees = (invitees) => {
    this.setState({
      invitees : invitees
    })
  }

  checkState = () => {
    console.log(this.state)
  }

  updateDb = () => {
    var url = 'http://localhost:5000/api/db'
    var event = {teamName: this.state.teamName, eventTime: this.state.eventTime, eventDate: this.state.eventDate, eventPlace: this.state.eventPlace, message: this.state.message, invitees: this.state.invitees}
    console.log(event)
    fetch(url, {
      method: 'POST',
      body: JSON.stringify( event ),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    // .then(window.location.reload())
    .catch(error => console.error("Error:", error));

  }
  render() {
    return (
      <div className="Newevent">
        <h2>Event booking form</h2>
        { this.state.stage===0 && <TeamForm Stage1Submit={this.Stage1Submit}/>}
        { this.state.stage > 0 && <p>Team Name: {this.state.teamName}</p>}

        { this.state.stage===1 && <Invitees Stage2Submit={this.Stage2Submit}/>}
        { this.state.stage > 1 && <p>Invitees:</p>}
        {this.state.invitees.map(invitelist => {
          return ( <p key={invitelist.part_name}>
                   {invitelist.part_name} |
                  {invitelist.part_number}

                   </p>
                   )
        })
      }
        { this.state.stage===2 && <EventForm Stage3Submit={this.Stage3Submit}/>}
      <button type="button" onClick={this.checkState}>Check State</button>
      <div><button type="button" onClick={this.updateDb}>Submit</button></div>

      </div>
    );
  }
}

export default Newevent;
