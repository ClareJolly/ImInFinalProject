import React, { Component } from 'react';

import './App.css';
import Newevent from './Newevent'
import Events from './Events'
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
  }


setEventID(event) {
  console.log(event)
  // console.log(this.state.event)
  this.setState({
    eventId : event,
    currentView : 'viewEvent',
    pageTitle : this.pages['viewEvent']
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

  render() {
    return (
      <div className="App">
      <Header pageTitle={this.state.pageTitle} showSection={this.showSection}/>


      {this.state.currentView === "home" && <WelcomeText/>}
      {this.state.currentView === "new" && <Newevent />}
      {this.state.currentView === "events" && <Events setEventID={this.setEventID}/>}
      {this.state.currentView === "viewEvent" && <ViewEvent response={'Your Event'} event={this.state.eventId}/>}
      </div>
    );
  }
}

export default App;
