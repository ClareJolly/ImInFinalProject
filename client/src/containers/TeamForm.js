import React, { Component } from 'react';

class TeamForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      teamName : this.props.defaultVal
      // teamName:''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  saveTeam() {
    if (this.canBeSubmitted()) {
    this.props.Stage1Submit(this.state.teamName)
    }
  }

  canBeSubmitted() {
  return (
    this.state.teamName.length > 0
  );
}

  render() {

  const isEnabled = this.canBeSubmitted();


// console.log(isEnabled)
    return (
      <div className="TeamForm">
        <div><label htmlFor="teamName">Event name</label></div>
        <div><input type='text' autoFocus name='teamName' id='teamName' value={this.state.teamName} required onChange={this.handleChange}/></div>
        <div><button type="button" disabled={!isEnabled} onClick={this.saveTeam}>Next</button></div>
      </div>
    );
  }
}

export default TeamForm;
