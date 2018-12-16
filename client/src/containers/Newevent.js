import React, { Component } from 'react';

import './Newevent.css';

import axios from 'axios'
import './App.css';
import Invitees from './Invitees'
import TeamForm from './TeamForm'
import EventForm from './EventForm'
import ViewEvent from '../components/ViewEvent'

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
      invitees_new : [],
      stage:0,
      savedEvent:'',
      event:''

    }
    console.log(this.state)
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
    // this.incrementStage()
    this.updateFinal(eventTime, eventDate, message, eventPlace)
    // this.incrementStage()
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
    console.log("updateFINAL")
    this.setState({
      eventTime: eventTime,
      eventDate: eventDate,
      message: message,
      eventPlace: eventPlace,
      invitees_new: this.state.invitees
    }, this.updateDb)
  }

  checkState = () => {
    console.log(this.state)
  }

  goBack = () => {
    this.decrementStage()
    // console.log("back")
    // console.log(this.state)

  }

  updateDb = () => {
    var url = 'http://localhost:5000/api/db'
    var event = {teamName: this.state.teamName, eventTime: this.state.eventTime, eventDate: this.state.eventDate, eventPlace: this.state.eventPlace, message: this.state.message, invitees: this.state.invitees}
    console.log(event)
    axios.post(url,event)
      .then(res => {
        // console.log(res.data)
        this.props.setEventID(res.data)
        this.setState({savedEvent:res.data,event:res.data})

      })
      // .then(this.incrementStage())
      // .then(this.props.setEventID)
      .then(console.log("STATE:",this.state))
    // fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify( event ),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // // .then(aaa => console.log(aaa))
    // .then(res => res.json())
    // // .then(res =>     this.setState({savedEvent:JSON.stringify(res),event:JSON.stringify(res)}))
    // .then(this.incrementStage())
    // // .then(window.location.reload())
    // // .then(this.props.showSection('events'))
    // .catch(error => console.error("Error:", error));

  }
  render() {
    return (
      <div className="Newevent">

        {this.state.stage === 0 && <TeamForm Stage1Submit={this.Stage1Submit} defaultVal={this.state.teamName}/>}
        {this.state.stage > 0 && this.state.stage < 3  && <p>Team Name: {this.state.teamName}</p>}
        {this.state.stage === 1 && <Invitees Stage2Submit={this.Stage2Submit} goBack={this.goBack} defaultVal={this.state.invitees}/>}
        {this.state.stage > 1 && this.state.stage < 3&& <p>Invitees:</p>}
        {this.state.stage > 1 && this.state.stage < 3&& <div>
          {this.state.invitees.map(invitelist => {
          return ( <p key={invitelist.part_name}>
                  {invitelist.part_name} |
                  {invitelist.part_number}
                   </p> )
              })
            }
        </div>}
      {this.state.stage === 2 && <EventForm Stage3Submit={this.Stage3Submit} goBack={this.goBack}/>}

      {this.state.stage === 3 && <ViewEvent event={this.state} response={'Your event has been saved'}/>}

      </div>
    );
  }
}

export default Newevent;
