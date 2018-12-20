import React, { Component } from 'react';
import Grid from 'react-css-grid'

class TeamForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      teamName : this.props.defaultVal
      
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  saveTeam = () => {

     if (!this.canBeSubmitted()) {

     return;
   }
     this.props.Stage1Submit(this.state.teamName)
   }

   canBeSubmitted() {

   return (
     this.state.teamName.length > 0
   );
 }

  render() {

  const isEnabled = this.canBeSubmitted();



    return (
      <div className="TeamForm">
      <Grid width={32} gap={24}>
       <div className="leftStyle"><label htmlFor="teamName">Event name</label>:</div>
       <div className="rightStyle"><input type='text' autoFocus name='teamName' id='teamName' value={this.state.teamName} required onChange={this.handleChange}/></div>
      </Grid>

      <Grid width={32} gap={24}>
       <div className="centeredStyle"><button type="button" disabled={!isEnabled} onClick={this.saveTeam}>Next</button></div>

      </Grid>


      </div>
    );
  }
}

export default TeamForm;
