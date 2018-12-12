import React, { Component } from 'react';
import './App.css';
import './Events.css';
import Modal from 'react-modal';
import EventModal from './EventModal'
import ViewEvent from '../components/ViewEvent'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class Events extends Component {
  constructor() {
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

  render() {
    return (
      <div className="Events">
        <h2 onClick={this.openModal}>Select a team </h2>
        {/*<div >

        {this.state.events}
        // {console.log(this.state.event_list)}

        </div>*/}
        {this.state.event_list.map ((event, index) => {
          return <div onClick={() => this.props.setEventID(event)} key={index} className="event-buttons">{event.teamName}
          {/*<Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          ><ViewEvent event={event} response={'testtesttest'}/></Modal>*/}
          </div>

        })}

      </div>
    );
  }
}

export default Events;
