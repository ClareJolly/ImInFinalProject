import React, { Component } from 'react';
import Grid from 'react-css-grid'
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

  }

  Stage2Submit = (invitees) => {
    this.incrementStage()
    this.updateInvitees(invitees)

  }

  Stage3Submit = (eventTime, eventDate, payByDate, eventPricePP, message, eventPlace) => {


    this.setState({
      eventTime: eventTime,
      eventDate: eventDate,
      eventPricePP: eventPricePP,
      payByDate: payByDate,
      message: message,
      eventPlace: eventPlace,
      invitees_new: this.state.invitees
    },this.updateFinal(eventTime, eventDate, payByDate, eventPricePP, message, eventPlace, ))

  }

  updateInvitees = (invitees) => {
    this.setState({
      invitees : invitees
    })
  }



  updateFinal = (eventTime, eventDate, payByDate, eventPricePP, message, eventPlace) => {

    ;

    var that=this


  var updateDb2 = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…

  var url = '/api/db'
  var event = {user_id:sessionStorage.getItem('userID'),teamName: that.state.teamName, eventTime: eventTime, eventDate: eventDate, payByDate: payByDate, eventPricePP: eventPricePP, eventPlace: eventPlace, message: message, invitees: that.state.invitees}

  var checking = axios.post(url,event)
    .then(res => {


      return res.data
    })

    resolve(checking);

  });

  updateDb2.then(function(result) {

  that.props.setEventID(result)




}, function(err) {
  console.log("Something broke");
});
  }




  goBack = () => {
    this.decrementStage()


  }


  render() {
    return (
      <div className="Newevent">

        {this.state.stage === 0 && <TeamForm Stage1Submit={this.Stage1Submit} defaultVal={this.state.teamName}/>}
        {this.state.stage > 0 && this.state.stage < 3  && <h1>{this.state.teamName}</h1>}
        {this.state.stage === 1 && <Invitees Stage2Submit={this.Stage2Submit} goBack={this.goBack} defaultVal={this.state.invitees}/>}
        {this.state.stage > 1 && this.state.stage < 3&& <p>Invitees:</p>}
        {this.state.stage > 1 && this.state.stage < 3&& <div>
          {this.state.invitees.map((invitelist, index) => {
          return ( <Grid key={index} width={32} gap={24}>
            <div className="leftStyle ">{invitelist.part_name}</div>
            <div className="rightStyle">{invitelist.part_number}</div>

          </Grid> )
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
