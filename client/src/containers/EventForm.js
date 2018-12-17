import React, { Component } from 'react';

class EventForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      eventPlace : '',
      eventDate : '',
      eventTime : '',
      message : '',
      eventPricePP : '',
      payByDate : ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
    // console.log(this.state)
  }

finalSave = () => {
  if (!this.canBeSubmitted()) {
  // evt.preventDefault();
  return;
}
    // console.log(this.state.team_name)
    this.props.Stage3Submit(this.state.eventTime, this.state.eventDate, this.state.payByDate, this.state.eventPricePP, this.state.message, this.state.eventPlace)
  }

  canBeSubmitted() {
  const { eventPlace, eventDate, eventTime, eventPricePP, payByDate } = this.state;
  return (
    eventPlace.length > 0 &&
    eventDate.length > 0 &&
    eventTime.length > 0 &&
    eventPricePP.length > 0 &&
    payByDate.length > 0
  );
}

  render() {

    const isEnabled = this.canBeSubmitted();


    return (
      <div className="EventForm">

      <div><label htmlFor="eventPlace">Place</label><input type='text' autoFocus name='eventPlace' id='eventPlace' required onChange={this.handleChange}/></div>
      <div><label htmlFor="eventPricePP">Price Per Person £</label><input type="number" name='eventPricePP' id='eventPricePP' required onChange={this.handleChange}/></div>
      <div><label htmlFor="eventDate">Date</label><input type="date" name='eventDate' id='eventDate' required onChange={this.handleChange}/></div>
      <div><label htmlFor="payByDate">Pay By Date</label><input type="date" name='payByDate' id='payByDate' required onChange={this.handleChange}/></div>
      <div><label htmlFor="eventTime">Time</label><input type="time" name='eventTime' id='eventTime' required onChange={this.handleChange}/></div>
      <div><label htmlFor="message">Message</label><textarea rows="4" cols="30" name="message" id="message" required onChange={this.handleChange}>
      </textarea></div>
      <div><button name="back" id="back" onClick={this.props.goBack}>Back</button><button type="button" disabled={!isEnabled} onClick={this.finalSave}>Save event</button></div>

      </div>
    );
  }
}

export default EventForm;
