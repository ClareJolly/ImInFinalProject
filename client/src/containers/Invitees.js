import React, { Component } from 'react';

import './App.css';
import Participant from '../components/Participant'

class Invitees extends Component {

  constructor(props){
    super(props);
    this.state = {
      invitees : []
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
    this.props.updateInvitees(this.state.invitees)
  }

  render() {
    return (
      <div className="Participants">
      {this.state.invitees.map(invitelist => {
        return ( <div key={invitelist.part_name}>
                 {invitelist.part_name} |
                {invitelist.part_number}

                 </div>
                 )
      })
    }
      <Participant updateParticipants={this.updateParticipants}/>
        <div><button type="button" onClick={this.SaveToParent}>Submit</button></div>


      </div>
    );
  }
}

export default Invitees;
