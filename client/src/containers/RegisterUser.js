import React, { Component } from 'react';
// import './RegisterUser.css';

import './App.css';
import Invitees from './Invitees'
import TeamForm from './TeamForm'
import EventForm from './EventForm'
import ViewEvent from '../components/ViewEvent'

class RegisterUser extends Component {

  constructor(props){
    super(props);
    this.state = {
      name : '',
      username : '',
      phoneNumber : '',
      password : ''
    }
  }

  UserRegister = (name, username, phoneNumber, password) => {
    this.setState({
      name: name,
      username: username,
      phoneNumber: phoneNumber,
      password: password
    }, this.updateDb)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  updateDb = () => {
    var url = 'http://localhost:5000/api/db/user'
    var event = {name: this.state.name, username: this.state.username, phoneNumber: this.state.phoneNumber, password: this.state.password}
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
      <div className="RegisterUser">
        <div>Register User</div>
        <div>Name<input type="text" name='name' id='name' value={this.state.name} required onChange={this.handleChange}/></div>
        <div>Username<input type="text" name='username' id='username' value={this.state.username} required onChange={this.handleChange}/></div>
        <div>Number<input type="text" name='phoneNumber' id='phoneNumber' value={this.state.phoneNumber} required onChange={this.handleChange}/></div>
        <div>Password<input type="text" name='password' id='password' value={this.state.password} required onChange={this.handleChange}/></div>
        <div><button onClick={this.updateDb} >Submit</button></div>
        </div>
    )
  }
  }

  export default RegisterUser;
