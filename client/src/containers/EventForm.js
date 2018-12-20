import React, { Component } from 'react';
import Grid from 'react-css-grid'
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
    
  }

  convertDate(date){
    function pad(s) { return (s < 10) ? '0' + s : s; }

    var d = new Date(date);
    d= [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');

    console.log(d)
    return d;
  }

finalSave = () => {
  if (!this.canBeSubmitted()) {

  return;
}

    var eventDate = this.convertDate(this.state.eventDate)
    var payByDate = this.convertDate(this.state.payByDate)
    this.props.Stage3Submit(this.state.eventTime, eventDate, payByDate, this.state.eventPricePP, this.state.message, this.state.eventPlace)
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
        <Grid width={32} gap={24}>
         <div className="leftStyle"><label htmlFor="eventPlace">Location</label>:</div>
         <div className="rightStyle"><input type='text' autoFocus name='eventPlace' id='eventPlace' required onChange={this.handleChange}/></div>
        </Grid>
        <Grid width={32} gap={24}>
         <div className="leftStyle"><label htmlFor="eventDate">Date</label>:</div>
         <div className="rightStyle"><input type="date" name='eventDate' id='eventDate' required onChange={this.handleChange}/></div>
        </Grid>
        <Grid width={32} gap={24}>
         <div className="leftStyle"><label htmlFor="eventTime">Time</label>:</div>
         <div className="rightStyle"><input type="time" name='eventTime' id='eventTime' required onChange={this.handleChange}/></div>
        </Grid>
        <Grid width={32} gap={24}>
         <div className="leftStyle"><label htmlFor="eventPricePP">Deposit per person</label>:</div>
         <div className="rightStyle"><input type="number" name='eventPricePP' id='eventPricePP' min="0" required onChange={this.handleChange}/></div>
        </Grid>
        <Grid width={32} gap={24}>
         <div className="leftStyle"><label htmlFor="payByDate">Pay by date</label>:</div>
         <div className="rightStyle"><input type="date" name='payByDate' id='payByDate' required onChange={this.handleChange}/></div>
        </Grid>

      <div><button name="back" id="back" onClick={this.props.goBack}>Back</button><button type="button" disabled={!isEnabled} onClick={this.finalSave}>Save event</button></div>

      </div>
    );
  }
}

export default EventForm;
