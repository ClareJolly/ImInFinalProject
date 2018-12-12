import React, { Component } from 'react';
import './App.css';

class Events extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/db')
    .then(results => {
      return results.json();

    }).then(data => {
      console.log(data)
    let events = data.map((event) => {
        return (
          <li>{event.invitees[0].part_name}</li>
        )
      })
      this.setState({events})
    })
  }

  render() {
    return (
      <div className="Events">
        <h2>Hello world</h2>
        <div>
        {this.state.events}
        </div>
      </div>
    );
  }
}

export default Events;
