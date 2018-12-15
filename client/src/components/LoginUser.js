import React, { Component } from 'react';
// import './RegisterUser.css';

import '../containers/App.css';

class LoginUser extends Component {

  constructor(props){
    super(props);
    this.state = {
      log_username : '',
      log_password : ''
    }
  }

  Login = () => {
    var log_username = this.state.log_username
    var log_password = this.state.log_password
    this.props.CheckLogin(log_username,log_password)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }



  render() {
    return (
      <div className="LoginUser">
        <div>Login</div>
        <div>Username<input type="text" name='log_username' id='log_username' value={this.state.username} required onChange={this.handleChange}/></div>
        <div>Password<input type="password" name='log_password' id='log_password' value={this.state.password} required onChange={this.handleChange}/></div>
        <div><button onClick={this.Login} >Submit</button></div>
        </div>
    )
  }
  }

  export default LoginUser;
