import React, { Component } from 'react';
import Grid from 'react-css-grid';

class WelcomeText extends Component {
 
  render() {
    return (
      <div className="WelcomeText">{this.props.loggedIn && <div>Hi, {this.props.user}</div>}

      <Grid width={32} gap={24}>
      <div className="centerStyle">Welcome to our Event Manager app</div>
      </Grid>

      <Grid width={32} gap={24}>
      <div className="centerStyle">Arrange</div>
      </Grid>

      <Grid width={32} gap={24}>
      <div className="centerStyle">Invite</div>
      </Grid>

      <Grid width={32} gap={24}>
      <div className="centerStyle">Notifications</div>
      </Grid>

      <Grid width={32} gap={24}>
      <div className="centerStyle">Payment</div>
      </Grid>

      <Grid width={32} gap={24}>
      <div className="centerStyle">All in one place</div>
      </Grid>

      </div>
    );
  }
}



export default WelcomeText;
