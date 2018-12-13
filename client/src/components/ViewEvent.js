import React, { Component } from 'react';


class ViewEvent extends Component {

  constructor(props){
    super(props);
    this.state = {
      teamName : '',
      eventPlace : '',
      eventDate : '',
      eventTime : '',
      message : '',
      invitees : [],
      eventID : this.props.event._id
    }
    console.log(this.props)
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
      <div>
Team Name: {this.props.event.teamName}
      </div>
      <div>
<p>Invitees:</p>

{this.props.event.invitees.map((invitelist, index) => {
return ( <p key={index}>
        {invitelist.part_name} |
        {invitelist.part_number}
         </p> )
    })
  }

      </div>
<div>
  Location:
  <span className="static" name="staticLocation">{this.props.event.eventPlace}</span>
  <input onChange={this.handleChange} className="edit" type="text" name="locationEdit"></input>
</div>

<div>
  Date:
  <span className="static" name="staticDate">{this.props.event.eventDate}</span>
  <input onChange={this.handleChange} className="edit" type="text" name="dateEdit"></input>
</div>

<div>
  Time:
  <span className="static" name="staticTime">{this.props.event.eventTime}</span>
  <input onChange={this.handleChange} className="edit" type="text" name="timeEdit"></input>
</div>

<div>
  Message:
  <span className="static" name="staticMessage">{this.props.event.message}</span>
  <input onChange={this.handleChange} className="edit" type="text" name="messageEdit"></input>
</div>

<div>
<button name="edit_event" id="edit_event" onClick={() => this.props.editEvent(this.state)}>Edit</button>
<button name="delete" id="delete" onClick={() => this.props.deleteEvent()}>Delete</button></div>
<button name="sent_invite" id="sent_invite">Send Invites</button>
      </div>
  )
}}

export default ViewEvent;
