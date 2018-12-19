import React, { Component } from 'react';
import './ViewEvents.css';
import axios from 'axios'
import Grid from 'react-css-grid'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

class ViewEvent extends Component {

  constructor(props){
    super(props);
    this.state = {
      event:this.props.event,
      requestShow:false,
      paypal_email: '',
      request_message: '',
      requestSent: false
    }

    // console.log(this.props.event)
    // console.log(this.props)
    // console.log(sessionStorage.getItem('viewingEvent'))

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }



  requestBalance() {
    this.setState({requestShow:true})
  }


  sendEmail() {
    var requestDetails = {"eventID":this.props.event._id,"manager_id":sessionStorage.getItem('userID'),"paypal_email":this.state.paypal_email,"request_message":this.state.request_message}
    axios.post('/api/send/email',requestDetails)
      .then(res => {
        console.log(res.data)
          this.props.balanceReqSent()
          this.setState({
            requestShow: false,
            requestSent: true

        })
      })
  }

   checkEmailRegex(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

canBeSubmitted() {

  console.log(this.validateEmail(this.state.paypal_email))
// const { paypal_email } = this.state;
// console.log(this.state.paypal_email)
return (
  // console.log(this.state.paypal_email)
  // this.state.paypal_email > 0 //&&
  this.validateEmail(this.state.paypal_email)
);
}

validateEmail(email) {
var check = this.checkEmailRegex(email)
return check
}


  render() {

    const isEnabled = this.canBeSubmitted();


    return (

      <div className="ViewEvent">

        <h1>{this.props.event.teamName}</h1>
          <Grid width={32} gap={24}>
            <div className="centerStyle">Invitees:</div>
          </Grid>

          {this.props.event.invitees_new.map((invitelist, index) => {
          return (
                  <Grid key={index} width={32} gap={24}>
                  <div className="leftStyle inviteeLeftStyle">{invitelist.part_name}</div>
                  <div className="centerStyle">{invitelist.part_number}</div>
                  <div className="rightStyle inviteeRightStyle">{invitelist.response} </div>
                </Grid>
                    )
              })
            }


      <Grid width={32} gap={24}>
       <div className="leftStyle">Location:</div>
       <div className="rightStyle">{this.props.event.eventPlace}</div>
      </Grid>

     <Grid width={32} gap={24}>
       <div className="leftStyle">Date:</div>
       <div className="rightStyle">{this.props.event.eventDate}</div>
      </Grid>

      <Grid width={32} gap={24}>
       <div className="leftStyle">Time:</div>
       <div className="rightStyle">{this.props.event.eventTime}</div>
      </Grid>



      <Grid width={32} gap={24}>
        <div className="leftStyle">Deposit per person:</div>
        <div className="rightStyle">£{this.props.event.eventPricePP}</div>
      </Grid>



      <Grid width={32} gap={24}>
        <div className="leftStyle">Pay By Date:</div>
        <div className="rightStyle">{this.props.event.payByDate}</div>
      </Grid>



      <Grid width={32} gap={24}>
        <div className="leftStyle"><button name="delete" className="deleteButtons" id="delete" onClick={() => this.props.deleteEvent(this.props.event._id)}></button></div>
        <div className="rightStyle"><button name="sent_invite" className="sendInvite" id="sent_invite" onClick={() => this.props.sendInvite()}></button></div>
      </Grid>

      {!this.state.requestSent && !this.props.event.balance_request_sent &&
      <Grid width={32} gap={24}>
        <div className="centerStyle">
          <button  name="sendBalance" className="" onClick={() => this.requestBalance()}>Request balance</button>
        </div>
      </Grid>

    }


{this.state.requestShow &&
      <Grid width={32} gap={24}>
        <div className="leftStyle"><label htmlFor="paypal_email">PayPal email address: </label></div>
        <div className="rightStyle"><input type="text" name="paypal_email" id="paypal_email" onChange={this.handleChange}/>
        { this.state.paypal_email.length > 0 && !this.validateEmail(this.state.paypal_email) && <div className="error">Not a valid email address</div>}</div>
      </Grid>
    }
{this.state.requestShow &&
      <Grid width={32} gap={24}>
        <div className="leftStyle"><label htmlFor="request_message">Optional message: </label></div>
        <div className="rightStyle"><textarea name="request_message" id="request_message" onChange={this.handleChange}></textarea></div>
      </Grid>
}

{this.state.requestShow &&
      <Grid width={32} gap={24}>
        <div className="centerStyle"><button  name="sendEmail" className="" disabled={!isEnabled} onClick={() => this.sendEmail()}>Send me my balance</button></div>

      </Grid>
}


{this.props.event.balance_request_sent &&
      <Grid width={32} gap={24}>
        <div className="centerStyle">Request for balance already sent</div>
      </Grid>
    }

{/*

<h3>{this.props.response}</h3>

      <div className="invitee-feilds">
<p>Invitees:</p>



{this.props.event.invitees_new.map((invitelist, index) => {

return ( <p key={index}>
        {invitelist.part_name} |
        {invitelist.part_number} |
      {invitelist.response} {invitelist.payment_confirmed === 'Y' && <img src='/images/paid.png' alt='paid' width='40px'/>}

         </p> )
    })
  }

      </div>

      <div className="event-feilds">
      Event Name: {this.props.event.teamName}
      </div>
<div className="event-feilds">Location: {this.props.event.eventPlace}</div>
<div className="event-feilds">Date: {this.props.event.eventDate}</div>
<div className="event-feilds">Pay By Date: {this.props.event.payByDate}</div>
<div className="event-feilds">Time: {this.props.event.eventTime}</div>
<div className="event-feilds">Cost per person: {this.props.event.eventPricePP}</div>
<div>

</div>
<button name="delete" className="deleteButtons" id="delete" onClick={() => this.props.deleteEvent(this.props.event._id)}></button>
<button  name="edit" className="editButtons" ></button>
<button name="sent_invite" className="sendInvite" id="sent_invite" onClick={() => this.props.sendInvite()}></button>
{!this.state.requestSent && !this.props.event.balance_request_sent && <div><button  name="sendBalance" className="" onClick={() => this.requestBalance()}>Request balance</button></div>}
{this.state.requestSent && <div>Request sent</div>}


{this.state.requestShow && <div>
<div><label htmlFor="paypal_email">PayPal email address: </label><input type="text" name="paypal_email" id="paypal_email" onChange={this.handleChange}/></div>
{ this.state.paypal_email.length > 0 && !this.validateEmail(this.state.paypal_email) && <span className="error">Not a valid email address</span>}
<div><label htmlFor="request_message">Optional message: </label><textarea name="request_message" id="request_message" onChange={this.handleChange}></textarea></div>

<div><button  name="sendEmail" className="" disabled={!isEnabled} onClick={() => this.sendEmail()}>Send me my balance</button></div>
  </div>}
  {this.props.event.balance_request_sent && <div>Request for balance already sent</div>} */}
</div>


  )
}}

export default ViewEvent;
