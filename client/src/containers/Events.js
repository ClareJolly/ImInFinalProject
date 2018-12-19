import React, { Component } from 'react';
import './App.css';
import './Events.css';
// import Modal from 'react-modal';
// import EventModal from './EventModal'
// import ViewEvent from '../components/ViewEvent'

// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };


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

          <p></p>

        )
      })
      this.setState({events})
    })

  }

  setAndDeleteEvent(id){
    // this.props.setEventID(event)
    this.props.deleteEvent(id)
  }
  render() {



    return (
      <div className="Events">
        <h2 onClick={this.openModal}>Select an Event </h2>
        {/*<div >

        {this.state.events}
        // {console.log(this.state.event_list)}

        </div>*/}
        {this.state.event_list.map ((event, index) => {
          var inviteesArray = event.invitees_new
          var inResponses = inviteesArray.filter(word => word.response === "IN").length
          // var outResponses = inviteesArray.filter(word => word.response === "OUT").length
          // var noneResponses = inviteesArray.filter(word => word.response === "NONE").length

          return <div key={index}>

            <button name="delete" className="deleteButtons" id="delete" onClick={() => this.setAndDeleteEvent(event._id)}></button>


            <div onClick={() => this.props.setEventID(event)} key={index} className="event-buttons">

            {event.teamName}<br/>
          <span className="inOrOut">{inResponses}/{inviteesArray.length} are</span> <strong>IN</strong>
          </div>
          <button  name="edit" className="editButtons" ></button>

          </div>

        })}

      </div>
    );
  }
}

export default Events;
