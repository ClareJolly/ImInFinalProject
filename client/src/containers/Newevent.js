import React, { Component } from 'react';

import './Newevent.css';
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


      </div>
    );
  }
}

export default Newevent;
