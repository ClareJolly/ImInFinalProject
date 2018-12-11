import React, { Component } from 'react';

import './App.css';
import Newevent from './Newevent'
import Events from './Events'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>I'm In</h1>
        <Newevent />
        <Events />
      </div>
    );
  }
}

export default App;
