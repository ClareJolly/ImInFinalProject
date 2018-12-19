import React from 'react';
import {shallow} from 'enzyme'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import Invitees from '../Invitees';

describe("Invitees", function() {

  let mountedInvitees
  beforeEach(()=>{
mountedInvitees = shallow(<Invitees defaultVal={[]}/>)
// mountedInvitees.setState({invitees : ['test']}
// );
// console.log(mountedInvitees.state)
})

  it('renders without crashing', () => {

    let mountedInvitees = shallow(<Invitees defaultVal={[]}/>)
  });


  it('contains at least 1 participant', () => {
    // console.log(mountedInvitees.state())
    const participant = mountedInvitees.find('Participant');
    expect(participant.length).toBe(1)

  })

  // updateParticipants = (participant) => {
  //   let invitees = [...this.state.invitees]
  //   invitees.push(participant)
  //   this.setState({
  //     invitees
  //   })
  //
  // }

  it('update participants ', () => {
    const instance = mountedInvitees.instance();

    // instance.setState({ stage: 0 })
    instance.updateParticipants({part_name:'part_name',part_number:'part_number'})
    expect(mountedInvitees.state('invitees')).toEqual([{"part_name": "part_name", "part_number": "part_number"}]);
    // expect(mountedNewevent.state('teamName')).toBe('t-name');
  })
})
