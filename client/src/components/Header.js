import React, { Component } from 'react';


class Header extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }



  render() {


    return (
      <div className="Header">
      <img src="/images/logo.png" alt="I'm in Logo" className="logo-img" width="100px"/>

      <div className="home_buttons">
{this.props.loggedIn && <button name="new" id="new" onClick={() => this.props.showSection('new')}>New Event</button>}
{this.props.loggedIn && <button name="events" id="events" onClick={() => this.props.showSection('events')}>View your events</button>}
{!this.props.loggedIn && <button name="login" id="login" onClick={() => this.props.showSection('login')}>Login/Register</button>}
{this.props.loggedIn && <button name="logout" id="logout" onClick={() => this.props.log('home')}>Log Out</button>}

      </div>
      <h1>{this.props.pageTitle}</h1>
      </div>
    );
  }
}

export default Header;
