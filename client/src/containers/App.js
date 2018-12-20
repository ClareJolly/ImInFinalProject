import React, { Component } from 'react';

import './App.css';
import Newevent from './Newevent'
import Events from './Events'
import RegisterLogin from './RegisterLogin'
import Header from '../components/Header'
import ViewEvent from '../components/ViewEvent'
import WelcomeText from '../components/WelcomeText'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {

  constructor(props){
    super(props);

    var loggedIn
    if (sessionStorage.getItem('username')=== null) {
      loggedIn = false
    } else {
      loggedIn = true
    }

    this.state = {
      currentView: "home",
      pageTitle: "",
      event:'',
      toasterShow: true,
      user: sessionStorage.getItem('username'),
      userID: sessionStorage.getItem('userID'),
      loggedIn: loggedIn,
      cookieaccept:sessionStorage.getItem('cookieaccept')
    }

    //section mapper for rerendering sections on page
    this.pages = {
      'home': '',
      'new' : 'Create a new event',
      'events' : 'Your events',
      'login' : 'Login or Register',
      'register' : 'Register',
      'viewevent' : 'View Event'
    }

    this.showSection = this.showSection.bind(this);
    this.setEventID = this.setEventID.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    // this.refreshEventList = this.refreshEventList.bind(this);
    this.sendInvite = this.sendInvite.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setLogout = this.setLogout.bind(this);
    this.invites = this.invites.bind(this);
    this.deleted = this.deleted.bind(this);
    this.balanceReqSent = this.balanceReqSent.bind(this);
  }

  // TOASTERS
  cookie = () => {
    toast("We have cookies.  Do you want them?", {
      onClose: () => this.cookieSet(),
      autoClose: false,
      position: toast.POSITION.BOTTOM_CENTER,
      className: 'black-background',
      bodyClassName: "grow-font-size",
      progressClassName: 'fancy-progress-bar'
      });
    }

    toast_login = () => {
      toast("You are logged in, " + this.state.user + "", {
        autoClose: true,
        position: toast.POSITION.TOP_RIGHT,
        className: 'black-background',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
      });
    }

    toast_logout = () => {
      toast("You are logged out", {
        autoClose: true,
        position: toast.POSITION.TOP_RIGHT,
        className: 'black-background',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
      });
    }

    invites = () => {
      toast("Invites sent", {
        autoClose: true,
        position: toast.POSITION.TOP_RIGHT,
        className: 'black-background',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
        });
      }

      deleted = () => {
        toast("Event deleted", {
          // onClose: () => this.cookieSet(),
          autoClose: true,
          position: toast.POSITION.TOP_RIGHT,
          className: 'black-background',
          bodyClassName: "grow-font-size",
          progressClassName: 'fancy-progress-bar'
          });
        }

        balanceReqSent = () => {
          toast("Balance request sent", {
            // onClose: () => this.cookieSet(),
            autoClose: true,
            position: toast.POSITION.TOP_RIGHT,
            className: 'black-background',
            bodyClassName: "grow-font-size",
            progressClassName: 'fancy-progress-bar'
            });
          }

  componentDidMount() {
    if (this.state.toasterShow && !this.state.cookieaccept){
      // this.cookie()
    }
  }

setEventID(event) {
  this.setState({
    event : event,
    currentView : 'viewEvent',
    pageTitle : this.pages['viewEvent'],
    refreshEventList:false
  })
}

  showSection(section) {
    this.setState({
      currentView : section,
      pageTitle : this.pages[section]
    })
  }

  cookieSet() {
    sessionStorage.setItem('cookieaccept', true);
    this.setState({
      cookieaccept : true
    })
  }

  deleteEvent = () => {
    var eventID = this.state.event._id
    console.log(eventID)
    var url = '/api/db/' + eventID
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .then(this.deleted())
    .then(window.location.reload())
    .then(this.setState({
      currentView : 'home',
      pageTitle : this.pages['home']
    }))

    .catch(error => console.error("Error:", error));

  }

  sendInvite = () => {
    console.log('sms test')
    var url = '/api/send/'
    var event = this.state.event
    // console.log(event)
    fetch(url, {
      method: 'POST',
      body: JSON.stringify( event ),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))

    .then(
      this.invites()

    // })
  )
    // .then(
    //   // this.invites()
    //   this.setState({
    //   currentView : 'events',
    //   pageTitle : this.pages['events']
    // })
  // )

    .catch(error => console.error("Error:", error));

  }


  setUser(user,userID) {

    sessionStorage.setItem('username', user);
    sessionStorage.setItem('userID', userID)
    this.setState({user: user, userID:userID, loggedIn:true})
    this.showSection('home')
    this.toast_login()

  }

  setLogout() {

    sessionStorage.clear()
    this.setState({user: '',userID:'', loggedIn:false})
    this.showSection('home')
    this.toast_logout()

  }

  render() {
    return (
      <div className="App">

      <Header pageTitle={this.state.pageTitle} showSection={this.showSection} user={this.state.user} loggedIn={this.state.loggedIn} setLogout={this.setLogout}/>

      <ToastContainer />
      {this.state.currentView === "home" && <WelcomeText user={this.state.user} loggedIn={this.state.loggedIn}/>}
      {this.state.currentView === "new" && <Newevent showSection={this.showSection} setEventID={this.setEventID}/>}
      {this.state.currentView === "login" && <RegisterLogin showSection={this.showSection} setUser={this.setUser}/>}
      {this.state.currentView === "events" && <Events  deleteEvent={this.deleteEvent}  setEventID={this.setEventID} refresh={this.refreshEventList}/>}
      {this.state.currentView === "viewEvent" && <ViewEvent balanceReqSent={this.balanceReqSent} response={'Your Event'} event={this.state.event} deleteEvent={this.deleteEvent} sendInvite={this.sendInvite}/>}
      </div>
    );
  }
}

export default App;
