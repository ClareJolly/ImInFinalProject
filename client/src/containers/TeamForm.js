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
      <div className="TeamForm">

        Team name
        <input type='text' name='team_name' id='team_name' onChange={this.handleChange}/>
        <button type="button" onClick={this.saveTeam}>Submit</button>


      </div>
    );
  }
}

export default Newevent;
