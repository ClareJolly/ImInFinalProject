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

  saveTeam = () => {
    // console.log(this.state.teamName)
    if (!this.canBeSubmitted()) {
    // evt.preventDefault();
    return;
  }
    this.props.Stage1Submit(this.state.teamName)
  }

  canBeSubmitted() {
  // const { teamName } = this.state;
  // console.log(this.state.teamName)
  return (
    this.state.teamName.length > 0
  );
}

  render() {

  const isEnabled = this.canBeSubmitted();


// console.log(isEnabled)
    return (
      <div className="TeamForm">
        <div><label htmlFor="teamName">Team name</label></div>
        <div><input type='text' name='teamName' id='teamName' value={this.state.teamName} required onChange={this.handleChange}/></div>
        <div><button type="button" disabled={!isEnabled} onClick={this.saveTeam}>Next</button></div>
      </div>
    );
  }
}

export default TeamForm;
