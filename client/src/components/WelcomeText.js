import React, { Component } from 'react';
import Grid from 'react-css-grid';

class WelcomeText extends Component {

  render() {
    return (
      <div className="WelcomeText">{this.props.loggedIn && <div>Hi, {this.props.user}</div>}

      <Grid width={32} gap={24}>
      <div className="centerStyle"><h1>Welcome to I'm IN - the all-in-one event tool.</h1></div>
      </Grid>

      <Grid width={32} gap={24}>
      <div className="centerStyle"><p>Ever try to arrange an event only to have people not RSVP or pay a deposit when you need it?  Well, we're here to help.</p></div>
      </Grid>

      <Grid width={32} gap={24}>
      <div className="centerStyle"><p>With I'm IN you can set up an event, sent invites by text, take deposit payments through PayPal and cashout your balance from us whenever you need to</p></div>
      </Grid>



      </div>
    );
  }
}



export default WelcomeText;
