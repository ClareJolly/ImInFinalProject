import React, { Component } from 'react';


class Participant extends Component {

  constructor(props){
    super(props);
    this.state = {
      part_name: '',
      part_number: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  commitParticipant = () => {
    this.props.updateParticipants({part_name:this.state.part_name,part_number:this.state.part_number})
  }

  render() {
    return (
      <div className="Participant">

        Participant name<input type='text' name='part_name' id='part_name' onChange={this.handleChange}/>
        Number<input type='text' name='part_number' id='part_number' onChange={this.handleChange}/>
     <button name="commit" id="commit" onClick={this.commitParticipant}>commit</button>
      </div>
    );
  }
}

export default Participant;
