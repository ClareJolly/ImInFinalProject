import React, { Component } from 'react';

import './App.css';
import Newevent from './Newevent'
import Events from './Events'
import RegisterUser from './RegisterUser'
import Header from '../components/Header'
import ViewEvent from '../components/ViewEvent'
import WelcomeText from '../components/WelcomeText'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentView: "home",
      pageTitle: "",
      eventId:''
    }
    console.log("are you working?")
     this.pages = {
      'home': '',
      'new' : 'Create a new event',
      'events' : 'Your events',
      'login' : 'Login',
      'register' : 'Register',
      'viewevent' : 'View Event'
    }
    this.showSection = this.showSection.bind(this);
    this.setEventID = this.setEventID.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.refreshEventList = this.refreshEventList.bind(this);
    this.sendInvite = this.sendInvite.bind(this);
  }


setEventID(event) {
  console.log(event)
  // console.log(this.state.event)
  this.setState({
    eventId : event,
    currentView : 'viewEvent',
    pageTitle : this.pages['viewEvent'],
    refreshEventList:false
  })
}

  showSection(section) {
    // console.log(this.state.currentView)
    // console.log(this.pages[section])
    this.setState({
      currentView : section,
      pageTitle : this.pages[section]
    })
  }

  deleteEvent = () => {
    var eventID = this.state.eventId._id
    console.log(eventID)
    var url = 'http://localhost:5000/api/db/' + eventID
    // var event = {teamName: this.state.teamName, eventTime: this.state.eventTime, eventDate: this.state.eventDate, eventPlace: this.state.eventPlace, message: this.state.message, invitees: this.state.invitees}
    // console.log(event)
    fetch(url, {
      method: 'DELETE',
      // body: JSON.stringify( event ),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    // .then(window.location.reload())
    .then(this.setState({
      currentView : 'home',
      pageTitle : this.pages['home']
    }))
    .then(console.log("refreshing"))
    .then(this.refreshEventList())
    .catch(error => console.error("Error:", error));

  }

  sendInvite = () => {
    console.log('sms test')
    var url = 'http://localhost:5000/api/send/'
    var event = this.state.eventId
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
    .then(this.setState({
      currentView : 'home',
      pageTitle : this.pages['home']
    }))
    .then(console.log("refreshing"))
    .then(this.refreshEventList())
    .catch(error => console.error("Error:", error));

  }

  refreshEventList () {
    console.log(this.state)
    this.setState({refreshEventList: !this.state.refreshEventList})
  }

  render() {
    return (
      <div className="App">

      <Header pageTitle={this.state.pageTitle} showSection={this.showSection}/>


      {this.state.currentView === "home" && <WelcomeText/>}
      {this.state.currentView === "new" && <Newevent />}
      {this.state.currentView === "login" && <RegisterUser />}
      {this.state.currentView === "events" && <Events setEventID={this.setEventID} refresh={this.refreshEventList}/>}
      {this.state.currentView === "viewEvent" && <ViewEvent response={'Your Event'} event={this.state.eventId} deleteEvent={this.deleteEvent} sendInvite={this.sendInvite}/>}
      </div>
    );
  }
}

export default App;
