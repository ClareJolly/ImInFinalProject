import React, { Component } from 'react';
// import './RegisterUser.css';
import axios from 'axios'
import './App.css';

class RegisterUser extends Component {

  constructor(props){
    super(props);
    this.state = {
      name : '',
      username : '',
      phoneNumber : '',
      password : '',
      isUsernameAvailable:''
    }
    // this.usernameAvailable = this.usernameAvailable.bind(this);
  }

  Register = () => {
    var name = this.state.name
    var username = this.state.username
    var phoneNumber = this.state.phoneNumber
    var password = this.state.password
    var that=this

    var usernameAvailable = new Promise(function(resolve, reject) {

    var checkURL = '/api/db/user/check-username'
    var userCredentials = {username:that.state.username}
    var checking = axios.post(checkURL,userCredentials)
      .then(res => {
        // console.log(res.data)
        // this.setState({isUsernameAvailable:res.data},)
        return res.data
      })
      resolve(checking);

    });

    usernameAvailable.then(function(result) {

      if(result==="Y"){
        that.props.UserRegister(name, username, phoneNumber, password);
      } else {
        
        that.setState({isUsernameAvailable:"N"})
      }

    }, function(err) {
      console.log("Something broke");
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  canBeSubmitted() {
  return (
    this.state.name.length > 0 &&
    this.state.username.length > 0 &&
    this.state.phoneNumber.length > 0 &&
    this.state.password.length > 0 &&
    this.validatePhoneNumbers(this.state.phoneNumber)
  );
  }

  validatePhoneNumbers(number) {
   var check = this.isMobile(number)
   return check
 }

  isMobile(v) {

     //handle leading 0
     if (v.indexOf('0') === 0) {
         v = v.substring(1);
     }

     var mobile_valid = /^7(?:[1-4]\d\d|5(?:0[0-8]|[13-9]\d|2[0-35-9])|624|7(?:0[1-9]|[1-7]\d|8[02-9]|9[0-689])|8(?:[014-9]\d|[23][0-8])|9(?:[04-9]\d|1[02-9]|2[0-35-9]|3[0-689]))\d{6}$/.test(v);
     var pager_valid = /^76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\d{6}$/.test(v);

     // https://en.wikipedia.org/wiki/Personal_numbering
     var personal_number = /^70\d{8}$/.test(v);

     if (pager_valid || mobile_valid || personal_number) {
         return true;
     }

     return false;
    }


  render() {

    const isEnabled = this.canBeSubmitted();

    return (
      <div className="RegisterUser">
        <div>Register</div>
        <div>Name<input type="text" name='name' id='name' value={this.state.name} required onChange={this.handleChange}/></div>
        <div>Username<input type="text" name='username' id='username' value={this.state.username} required onChange={this.handleChange}/>
        {this.state.isUsernameAvailable === 'N' && <span className="error">Username taken</span>}</div>
        <div>Phone number<input type="text" name='phoneNumber' id='phoneNumber' value={this.state.phoneNumber} required onChange={this.handleChange}/>{this.state.phoneNumber.length > 0 && !this.validatePhoneNumbers(this.state.phoneNumber) && <span className="error">Not a valid mobile number</span>}</div>
        <div>Password<input type="password" name='password' id='password' value={this.state.password} required onChange={this.handleChange}/></div>
        <div><button disabled={!isEnabled} onClick={this.Register} >Submit</button></div>
        </div>
    )
  }
  }

  export default RegisterUser;
