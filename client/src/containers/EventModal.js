import React, { Component } from 'react';
import './App.css';
import Modal from 'react-modal';

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

class EventModal extends Component {
  constructor(props) {
    super(props);

console.log(this.props.invitees)
    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>{this.props.event}</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>{this.props.event}</h2>
          <div>


            {this.props.invitees.map((invitelist, index) => {
              return ( <div key={index}>
                  {invitelist.part_name}                   </div>
                   )
              })
            }

          </div>

          <form>
              <button onClick={this.closeModal}>close</button>
            <input />
         </form>
        </Modal>
      </div>
    );
  }
}

export default EventModal;
