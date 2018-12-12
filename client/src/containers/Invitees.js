import React, { Component } from 'react';

import './App.css';
import Participant from '../components/Participant'

class Invitees extends Component {

  constructor(props){
    super(props);
    this.state = {
      invitees : this.props.defaultVal
      // invitees : []
    }
    this.updateParticipants = this.updateParticipants.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  updateParticipants = (participant) => {
    let invitees = [...this.state.invitees]
    invitees.push(participant)
    this.setState({
      invitees
    })

  }

  SaveToParent = () => {
    this.props.Stage2Submit(this.state.invitees)
  }

  render() {
    return (
      <div className="Participants">
      {this.state.invitees.length > 0 && <div>{this.state.invitees.map((invitelist, index) => {
        return ( <div key={index}>
            {invitelist.part_name} |
            {invitelist.part_number}
             </div>
             )
        })
      }</div>}
      <Participant updateParticipants={this.updateParticipants}/>
      <div><button name="back" id="back" onClick={this.props.goBack}>Back</button>
        {this.state.invitees.length > 0 && <button type="button" onClick={this.SaveToParent}>Next</button>}
        </div>


      </div>
    );
  }
}

export default Invitees;
