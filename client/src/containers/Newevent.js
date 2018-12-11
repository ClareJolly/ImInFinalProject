import React, { Component } from 'react';

import './App.css';
import Invitees from './Invitees'

class Newevent extends Component {

  constructor(props){
    super(props);
    this.state = {
      team_name : '',
      event_place : '',
      event_date : '',
      event_time : '',
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

  render() {
    return (
      <div className="Newevent">
        <h2>Event booking form</h2>
        <div>Team name
        <input type='text' name='team_name' id='team_name' onChange={this.handleChange}/></div>
        <Invitees updateInvitees={this.updateInvitees}/>

        <div>Place<input type='text' name='event_place' id='event_place' onChange={this.handleChange}/></div>

        <div>Date<input type="date" name='event_date' id='event_date' onChange={this.handleChange}/></div>
        <div>Time<input type="time" name='event_time' id='event_time' onChange={this.handleChange}/></div>
        <div>Message<textarea rows="4" cols="30" name="message" id="message" onChange={this.handleChange}>
        </textarea></div>
        <div><button type="button" onClick={this.checkState}>Submit</button></div>


      </div>
    );
  }
}

export default Newevent;
