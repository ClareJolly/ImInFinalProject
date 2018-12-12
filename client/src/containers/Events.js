import React, { Component } from 'react';
import './App.css';
import './Events.css';
import EventModal from './EventModal'
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
          <div className="event-buttons"  >

            <EventModal event={event.teamName} />

          </div>
        )
      })
      this.setState({events})
    })
  }

  render() {
    return (
      <div className="Events">
        <h2>Select a team</h2>
        <div >

        {this.state.events}

        </div>
      </div>
    );
  }
}

export default Events;
