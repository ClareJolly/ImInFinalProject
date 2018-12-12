import React, { Component } from 'react';

import './App.css';
import Newevent from './Newevent'
import Events from './Events'

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src="images/logo.png" alt="I'm in Logo" className="logo-img" width="100px"/>
        <Newevent />
        <Events />
      </div>
    );
  }
}

export default App;
