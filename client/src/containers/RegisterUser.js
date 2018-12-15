import React, { Component } from 'react';
// import './RegisterUser.css';

import './App.css';

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

  Register = () => {
    var name = this.state.name
    var username = this.state.username
    var phoneNumber = this.state.phoneNumber
    var password = this.state.password
    this.props.UserRegister(name, username, phoneNumber, password);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }



  render() {
    return (
      <div className="RegisterUser">
        <div>Register</div>
        <div>Name<input type="text" name='name' id='name' value={this.state.name} required onChange={this.handleChange}/></div>
        <div>Username<input type="text" name='username' id='username' value={this.state.username} required onChange={this.handleChange}/></div>
        <div>Number<input type="text" name='phoneNumber' id='phoneNumber' value={this.state.phoneNumber} required onChange={this.handleChange}/></div>
        <div>Password<input type="password" name='password' id='password' value={this.state.password} required onChange={this.handleChange}/></div>
        <div><button onClick={this.Register} >Submit</button></div>
        </div>
    )
  }
  }

  export default RegisterUser;
