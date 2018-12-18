import React, { Component } from 'react';
import './ViewEvents.css';

class ViewEvent extends Component {

  constructor(props){
    super(props);
    this.state = {
      event:this.props.event
    }

    // console.log(this.props.event)
    // console.log(this.props)
    // console.log(sessionStorage.getItem('viewingEvent'))

  }

  // handleChange = (event) => {
  //   this.setState({
  //     [event.target.name] : event.target.value
  //   })
  // }


  render() {
    return (

      <div className="ViewEvent">

<h3>{this.props.response}</h3>

      <div className="invitee-feilds">
<p>Invitees:</p>



{this.props.event.invitees_new.map((invitelist, index) => {
  // var paid_image = ''
  // if (invitelist.payment_confirmed === 'Y') {
  //   return (<img src='/paid.png' alt='paid'>)
  // }
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
      </div>


  )
}}

export default ViewEvent;
