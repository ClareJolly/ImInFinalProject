import React, { Component } from 'react';

import './App.css';
import Newevent from './Newevent'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>I'm In</h1>
        <Newevent />

      </div>
    );
  }
}

export default App;
