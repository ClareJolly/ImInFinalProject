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
      payByDate : '',
      eventTime : '',
      eventPricePP : '',
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

  Stage3Submit = (eventTime, eventDate, payByDate, eventPricePP, message, eventPlace) => {
    // this.incrementStage()
    console.log("stage 3")
    this.setState({
      eventTime: eventTime,
      eventDate: eventDate,
      eventPricePP: eventPricePP,
      payByDate: payByDate,
      message: message,
      eventPlace: eventPlace,
      invitees_new: this.state.invitees
    },this.updateFinal(eventTime, eventDate, payByDate, eventPricePP, message, eventPlace, ))

    // this.updateFinal(eventTime, eventDate, message, eventPlace)
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

  // updateFinal = (eventTime, eventDate, message, eventPlace) => {
  //   console.log("updateFINAL")

  // }

  updateFinal = (eventTime, eventDate, payByDate, eventPricePP, message, eventPlace) => {
    console.log("DO UPDATE")
    ;
    // var name = this.state.name
    // var username = this.state.username
    // var phoneNumber = this.state.phoneNumber
    // var password = this.state.password
    var that=this
    // this.usernameAvailable()
    // var p = this.usernameAvailable()

  var updateDb2 = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…
  console.log(sessionStorage.getItem('userID'))
  var url = 'http://localhost:5000/api/db'
  var event = {user_id:sessionStorage.getItem('userID'),teamName: that.state.teamName, eventTime: eventTime, eventDate: eventDate, payByDate: payByDate, eventPricePP: eventPricePP, eventPlace: eventPlace, message: message, invitees: that.state.invitees}
  console.log(event)
  var checking = axios.post(url,event)
    .then(res => {
      console.log("NEW:",res.data)
      // this.props.setEventID(res.data)
      // this.setState({savedEvent:res.data,event:res.data})
      return res.data
    })
    // .then(resp => {console.log(resp.data)})
    resolve(checking);

  });

  updateDb2.then(function(result) {
  console.log("Promise worked");
  that.props.setEventID(result)



  // that.setState({savedEvent:JSON.stringify(result),event:JSON.stringify(result)},that.props.showSection('events'))
}, function(err) {
  console.log("Something broke");
});
  }


  checkState = () => {
    console.log(this.state)
  }

  goBack = () => {
    this.decrementStage()
    // console.log("back")
    // console.log(this.state)

  }

  updateDbx = () => {
    var url = 'http://localhost:5000/api/db'
    var event = {teamName: this.state.teamName, eventTime: this.state.eventTime, eventDate: this.state.eventDate, payByDate: this.state.payByDate, eventPricePP: this.state.eventPricePP, eventPlace: this.state.eventPlace, message: this.state.message, invitees: this.state.invitees}
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
        {this.state.stage > 0 && this.state.stage < 3  && <p>Event Name: {this.state.teamName}</p>}
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
