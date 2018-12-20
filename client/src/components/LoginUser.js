import React, { Component } from 'react';

import Grid from 'react-css-grid';

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

  canBeSubmitted() {

  return (
    this.state.log_username.length > 0 &&
    this.state.log_password.length > 0
  );
  }

  render() {
    const isEnabled = this.canBeSubmitted();
    return (

      <div className="LoginUser">

      <Grid width={32} gap={24}>
      <div className="centerStyle">Login</div>
      </Grid>

      <Grid width={32} gap={24}>
       <div className="leftStyle">Username</div>
       <div className="rightStyle"><input type="text" name='log_username' id='log_username' value={this.state.username} required onChange={this.handleChange}/></div>
      </Grid>


      <Grid width={32} gap={24}>
       <div className="leftStyle">Password</div>
       <div className="rightStyle"><input type="password" name='log_password' id='log_password' value={this.state.password} required onChange={this.handleChange}/></div>
      </Grid>

      <Grid width={32} gap={24}>
      <div className="centerStyle"><button disabled={!isEnabled} onClick={this.Login} >Submit</button></div>
      </Grid>

      </div>

    )
  }
  }

  export default LoginUser;
