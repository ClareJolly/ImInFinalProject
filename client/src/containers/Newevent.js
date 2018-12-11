import React, { Component } from 'react';
// import axios from 'axios'
import './App.css';
import Invitees from './Invitees'

class Newevent extends Component {

  constructor(props){
    super(props);
    this.state = {
      teamName : '',
      eventPlace : '',
      eventDate : '',
      eventTime : '',
      message : '',
      invitees : []
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
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
        <div>Team name
        <input type='text' name='teamName' id='teamName' onChange={this.handleChange}/></div>
        <Invitees updateInvitees={this.updateInvitees}/>

        <div>Place<input type='text' name='eventPlace' id='eventPlace' onChange={this.handleChange}/></div>

        <div>Date<input type="date" name='eventDate' id='eventDate' onChange={this.handleChange}/></div>
        <div>Time<input type="time" name='eventTime' id='eventTime' onChange={this.handleChange}/></div>
        <div>Message<textarea rows="4" cols="30" name="message" id="message" onChange={this.handleChange}>
        </textarea></div>
        <div><button type="button" onClick={this.updateDb}>Submit</button></div>

      </div>
    );
  }
}

export default Newevent;
