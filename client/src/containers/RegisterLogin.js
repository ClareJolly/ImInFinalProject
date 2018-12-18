import React, { Component } from 'react';
import RegisterUser from './RegisterUser'
import LoginUser from '../components/LoginUser'
import axios from 'axios'
// import './RegisterUser.css';

import './App.css';

class RegisterLogin extends Component {

  constructor(props){
    super(props);
    this.state = {
      showSection : '',
      usernameValid: '',
      loginStatus: '',
      loginAttempted: false,
      loginMessage: '',
      userID:''
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
    }, this.RegisterUserDb)
  }

  UserLogin = (username, password) => {
    this.CheckLogin(username,password)
  }

  CheckLogin = (username, password) => {
    var userCredentials = {username:username,password:password}
    var loginurl = '/api/db/user/login'

    axios.post(loginurl,userCredentials)
      .then(res => {
        console.log(res.data)
        if(res.data.response === "YAY"){
          var userID = res.data.userID
          this.setState({
            loginStatus: true,
            usernameValid: true,
          loginAttempted:true,
        loginMessage:"Welcome, "+username+". You have successfully logged in"})
        this.props.setUser(username,userID)
        } else {
          this.setState({loginStatus: false,
          loginAttempted:true,
        loginMessage:"Your username and/or password don't match"})
          if (res.data.response === "Username NOPE") {
            this.setState({usernameValid: false
            })
          }
        }
      })
  }



  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  RegisterUserDb = () => {
    var url = '/api/db/user'
    var event = {name: this.state.name, username: this.state.username, phoneNumber: this.state.phoneNumber, password: this.state.password}
    // console.log(event)
    fetch(url, {
      method: 'POST',
      body: JSON.stringify( event ),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(resp => this.props.setUser(resp.username,resp._id))
    .catch(error => console.error("Error:", error));
  }

  render() {
    return (
      <div className="RegisterLogin">
      {this.state.showSection === "" && <div>Register or login to create events and view any that you have already saved.</div>}
      {this.state.showSection === "" && <div>
      Already registered? <button id="login" onClick={() => this.show("login")}>Login</button>
      </div>}
      {this.state.showSection === "" && <div>Are you new? <button id="register" onClick={() => this.show("register")}>Register</button>
      </div>}
      {this.state.showSection ==="register" && <RegisterUser UserRegister={this.UserRegister}/>}
      {this.state.loginMessage !== '' && <div>{this.state.loginMessage}</div>}
      {this.state.showSection === "login" && <LoginUser CheckLogin={this.CheckLogin}/>}
        </div>
    )
  }
  }

  export default RegisterLogin;
