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

  decrementStage = () => {
    var stage = this.state.stage
    var previousStage = stage - 1
    this.setState({
      stage: previousStage
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

  Stage3Submit = (eventTime, eventDate, message, eventPlace) => {
    this.incrementStage()
    this.updateFinal(eventTime, eventDate, message, eventPlace)
    // console.log(this.state.stage)
    // this.updateDb()
    console.log("db")
  }

  updateInvitees = (invitees) => {
    this.setState({
      invitees : invitees
    })
  }

  updateFinal = (eventTime, eventDate, message, eventPlace) => {
    this.setState({
      eventTime: eventTime,
      eventDate: eventDate,
      message: message,
      eventPlace: eventPlace
    }, this.updateDb)
  }

  checkState = () => {
    console.log(this.state)
  }

  goBack = () => {
    this.decrementStage()
    console.log("back")
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
        {this.state.stage === 3 && <h3>Your event has been saved</h3>}
        { this.state.stage===0 && <TeamForm Stage1Submit={this.Stage1Submit} defaultVal={this.state.teamName}/>}
        { this.state.stage > 0 && <p>Team Name: {this.state.teamName}</p>}

        { this.state.stage===1 && <Invitees Stage2Submit={this.Stage2Submit} goBack={this.goBack} defaultVal={this.state.invitees}/>}
        { this.state.stage > 1 && <p>Invitees:</p>}
        { this.state.stage > 1 && <div>{this.state.invitees.map(invitelist => {
          return ( <p key={invitelist.part_name}>
                   {invitelist.part_name} |
                  {invitelist.part_number}

                   </p>
                   )
        })
      }</div>}
        { this.state.stage===2 && <EventForm Stage3Submit={this.Stage3Submit} goBack={this.goBack}/>}

      { this.state.stage===20 && <div><button type="button" onClick={this.updateDb}>Submit</button></div>}
      {this.state.stage === 3 && <div>Location: {this.state.eventPlace}</div>}
      {this.state.stage === 3 && <div>Date: {this.state.eventDate}</div>}
      {this.state.stage === 3 && <div>Time: {this.state.eventTime}</div>}
      {this.state.stage === 3 && <div>Message: {this.state.message}</div>}

      { this.state.stage===20 &&<button type="button" onClick={this.checkState}>Check State</button>}
      </div>
    );
  }
}

export default Newevent;
