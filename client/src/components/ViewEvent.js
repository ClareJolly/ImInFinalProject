import React, { Component } from 'react';
import './ViewEvents.css';
import axios from 'axios'
import Grid from 'react-css-grid'

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

return (

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

</div>


  )
}}

export default ViewEvent;
