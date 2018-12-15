import React, { Component } from 'react';


class WelcomeText extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }



  render() {


    return (
      <div className="WelcomeText">{this.props.loggedIn && <div>Hi, {this.props.user}</div>}
      <div><p>Welcome to our super cool event arranging tool</p>
      <p>From here you can arrange an event and set up a regular team and send out notifications to the people you want to invite</p></div>
      </div>
    );
  }
}

export default WelcomeText;
