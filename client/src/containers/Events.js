import React, { Component } from 'react';
import './App.css';
import './Events.css';



class Events extends Component {
  constructor(props) {
    super();
    this.state = {
      events: [],
      event_list:[]
    }



  }



  componentDidMount() {
    fetch('/api/db/event/user/'+sessionStorage.getItem('userID'))
    .then(results => {
      return results.json();

    }).then(data => {

      this.setState({event_list: data})
    let events = data.map((event, index) => {
        return (

          <button key={index} className="event-buttons"  >



          </button>

        )
      })
      this.setState({events})
    })

  }

  setAndDeleteEvent(id){

    this.props.deleteEvent(id)
  }
  render() {



    return (
      <div className="Events">
        {this.state.event_list.length > 0 && <h2 >Select an Event </h2>}

{this.state.event_list.length === 0 && <div>No events yet, why not add one</div>}

        {this.state.event_list.map ((event, index) => {
          var inviteesArray = event.invitees_new
          var inResponses = inviteesArray.filter(word => word.response === "IN").length

          return <div key={index}>


<button name="delete" className="deleteButtons" id="delete" onClick={() => this.setAndDeleteEvent(event._id)}></button>

            <div onClick={() => this.props.setEventID(event)} key={index} className="event-buttons">

            {event.teamName}<br/>
          <span className="inOrOut">{inResponses}/{inviteesArray.length} are</span> <strong>IN</strong>
          </div>



          </div>

        })}


      </div>
    );
  }
}

export default Events;
