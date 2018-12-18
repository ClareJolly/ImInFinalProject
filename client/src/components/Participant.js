import React, { Component } from 'react';


class Participant extends Component {

  constructor(props){
    super(props);
    this.state = {
      part_name: '',
      part_number: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  commitParticipant = () => {
    if (!this.canBeSubmitted()) {
    // evt.preventDefault();
    return;
  }
    this.props.updateParticipants({part_name:this.state.part_name,part_number:this.state.part_number})
    this.setState({part_number:'', part_name:''})
  }

  canBeSubmitted() {
  const { part_name, part_number } = this.state;
  // console.log(this.validatePhoneNumbers(this.state.part_number))
  // console.log("can be:", part_name.length > 0 &&

  // this.validatePhoneNumbers(this.state.part_number)
// )
  return (
    part_name.length > 0 &&
    part_number.length > 0 &&
    this.validatePhoneNumbers(this.state.part_number)
  );
}

 validatePhoneNumbers(number) {
  var check = this.isMobile(number)
  return check
}

 isMobile(v) {

        //handle leading 0
        if (v.indexOf('0') === 0) {
            v = v.substring(1);
        }

        var mobile_valid = /^7(?:[1-4]\d\d|5(?:0[0-8]|[13-9]\d|2[0-35-9])|624|7(?:0[1-9]|[1-7]\d|8[02-9]|9[0-689])|8(?:[014-9]\d|[23][0-8])|9(?:[04-9]\d|1[02-9]|2[0-35-9]|3[0-689]))\d{6}$/.test(v);
        var pager_valid = /^76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\d{6}$/.test(v);

        // https://en.wikipedia.org/wiki/Personal_numbering
        var personal_number = /^70\d{8}$/.test(v);

        if (pager_valid || mobile_valid || personal_number) {
            return true;
        }

        return false;
    }

  render() {

    const isEnabled = this.canBeSubmitted();
    // console.log("Is Enabled:", isEnabled)
    // const errors = this.validatePhoneNumbers(this.state.part_number);
    // console.log(this.validatePhoneNumbers(this.state.part_number))
    return (
      <div className="Participant">

        <div><label htmlFor="part_name">Name</label><input type='text' autoFocus name='part_name' id='part_name' value={this.state.part_name} onChange={this.handleChange}/></div>
        <div><label htmlFor="part_number">Phone number</label><input type='text' name='part_number' id='part_number' value={this.state.part_number} onChange={this.handleChange}/>
        {this.state.part_number.length > 0 && !this.validatePhoneNumbers(this.state.part_number) && <span className="error">Not a valid mobile number</span>}</div>
     <div><button name="add" id="add" disabled={!isEnabled} onClick={this.commitParticipant}>add</button></div>
      </div>
    );
  }
}

export default Participant;
