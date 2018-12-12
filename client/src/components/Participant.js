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
    if (!this.canBeSubmitted()) {
    // evt.preventDefault();
    return;
  }
    this.props.updateParticipants({part_name:this.state.part_name,part_number:this.state.part_number})
    this.setState({part_number:'', part_name:''})
  }

  canBeSubmitted() {
  const { part_name, part_number } = this.state;
  return (
    part_name.length > 0 &&
    part_number.length > 0
  );
}

  render() {

    const isEnabled = this.canBeSubmitted();
    return (
      <div className="Participant">

        Participant name<input type='text' name='part_name' id='part_name' value={this.state.part_name} onChange={this.handleChange}/>
        Number<input type='text' name='part_number' id='part_number' value={this.state.part_number} onChange={this.handleChange}/>
     <button name="add" id="add" disabled={!isEnabled} onClick={this.commitParticipant}>add</button>
      </div>
    );
  }
}

export default Participant;
