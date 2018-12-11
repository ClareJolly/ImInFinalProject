import React, { Component } from 'react';

class Newevent extends Component {

  constructor(props){
    super(props);
    this.state = {
      team_name : ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  saveTeam = () => {
    console.log(this.state.team_name)
    this.props.Stage1Submit(this.state.team_name)
  }

  render() {
    return (
      <div className="EventForm">

      <div>Place<input type='text' name='event_place' id='event_place' onChange={this.handleChange}/></div>

      <div>Date<input type="date" name='event_date' id='event_date' onChange={this.handleChange}/></div>
      <div>Time<input type="time" name='event_time' id='event_time' onChange={this.handleChange}/></div>
      <div>Message<textarea rows="4" cols="30" name="message" id="message" onChange={this.handleChange}>
      </textarea></div>
      <div><button type="button" onClick={this.checkState}>Submit</button></div>

      </div>
    );
  }
}

export default Newevent;
