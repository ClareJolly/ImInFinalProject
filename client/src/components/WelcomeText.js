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
      <div className="WelcomeText">
      <div>Welcome to our super cool event arranging tool</div>
      </div>
    );
  }
}

export default WelcomeText;
