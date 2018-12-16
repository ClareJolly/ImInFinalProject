import React, { Component } from 'react';
import './ViewEvents.css';

class ViewEvent extends Component {

  constructor(props){
    super(props);
    this.state = {
      event:this.props.event
    }

    console.log(this.props.event)
    // console.log(this.props)

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }


  render() {
    return (

      <div className="ViewEvent">

<h3>{this.props.response}</h3>

      <div className="invitee-feilds">
<p>Invitees:</p>



{this.props.event.invitees_new.map((invitelist, index) => {
return ( <p key={index}>
        {invitelist.part_name} |
        {invitelist.part_number} |
      {invitelist.response}
         </p> )
    })
  }

      </div>

      <div className="event-feilds">
      Team Name: {this.props.event.teamName}
      </div>
<div className="event-feilds">Location: {this.props.event.eventPlace}</div>
<div className="event-feilds">Date: {this.props.event.eventDate}</div>
<div className="event-feilds">Time: {this.props.event.eventTime}</div>
<div className="event-feilds">Message: {this.props.event.message}</div>
<div>

</div>
<button name="delete" className="deleteButtons" id="delete" onClick={() => this.props.deleteEvent()}></button>
<button  name="edit" className="editButtons" ></button>
<button name="sent_invite" className="sendInvite" id="sent_invite" onClick={() => this.props.sendInvite()}></button>
      </div>


  )
}}

export default ViewEvent;
