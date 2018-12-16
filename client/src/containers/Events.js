import React, { Component } from 'react';
import './App.css';
import './Events.css';
// import Modal from 'react-modal';
import EventModal from './EventModal'
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
    this.state = {modalIsOpen: false,
      events: [],
      event_list:[]
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);


  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }



  componentWillReceiveProps(props) {
    console.log(props)
    const { refresh } = this.props;
    console.log(props.refresh)
    if (props.refresh !== refresh) {
        this.setState({ state: this.state })
        .then(this.refreshEventList)
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/db')
    .then(results => {
      return results.json();

    }).then(data => {
      // console.log(data)
      this.setState({event_list: data})
    let events = data.map((event, index) => {
        return (

          <button key={index} className="event-buttons"  >

            <EventModal index={index} event={event.teamName} invitees={event.invitees} />

          </button>

        )
      })
      this.setState({events})
    })
  }

  setAndDeleteEvent(event){
    this.props.setEventID(event)
    this.props.deleteEvent()
  }
  render() {



    return (
      <div className="Events">
        <h2 onClick={this.openModal}>Select a team </h2>
        {/*<div >

        {this.state.events}
        // {console.log(this.state.event_list)}

        </div>*/}
        {this.state.event_list.map ((event, index) => {
          var inviteesArray = event.invitees_new
          var inResponses = inviteesArray.filter(word => word.response === "IN").length
          // var outResponses = inviteesArray.filter(word => word.response === "OUT").length
          // var noneResponses = inviteesArray.filter(word => word.response === "NONE").length

          return <div>

            <button name="delete" className="deleteButtons" id="delete" onClick={() => this.setAndDeleteEvent(event)}></button>


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
