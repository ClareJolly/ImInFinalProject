import React, { Component } from 'react';
import RegisterUser from './RegisterUser'
import LoginUser from '../components/LoginUser'
// import './RegisterUser.css';

import './App.css';

class RegisterLogin extends Component {

  constructor(props){
    super(props);
    this.state = {
      showSection : ''
    }
  }

show(section) {
  this.setState({
    showSection : section
  })
}

  UserRegister = (name, username, phoneNumber, password) => {
    this.setState({
      name: name,
      username: username,
      phoneNumber: phoneNumber,
      password: password
    }, this.updateDb)
  }

  UserLogin = (username, password) => {
    var log_username = username
    var log_password = password
    this.CheckLogin(username,password)
  }
  CheckLogin = (username, password) => {
    var userCredentials = {username:username,password:password}
    fetch('http://localhost:5000/api/db/login',{
      method: 'GET',
      body: JSON.stringify( userCredentials ),
      headers: {
        'Content-Type': 'application/json'
      }})
    .then(results => {
      return results.json();

    }).then(data => {
      console.log(data)
    })
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
    .then(this.props.showSection('home'))
    .catch(error => console.error("Error:", error));
  }

  render() {
    return (
      <div className="RegisterLogin">
      {this.state.showSection === "" && <div>
      Already registered? <button onClick={() => this.show("login")}>Login</button>
      </div>}
      {this.state.showSection === "" && <div>Are you new? <button onClick={() => this.show("register")}>Register</button>
      </div>}
      {this.state.showSection ==="register" && <RegisterUser UserRegister={this.UserRegister}/>}
      {this.state.showSection === "login" && <LoginUser CheckLogin={this.CheckLogin}/>}
        </div>
    )
  }
  }

  export default RegisterLogin;
