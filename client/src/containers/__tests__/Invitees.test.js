import React from 'react';
import {shallow} from 'enzyme'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import Invitees from '../Invitees';

describe("Invitees", function() {

  let mountedInvitees
  beforeEach(()=>{
mountedInvitees = shallow(<Invitees/>)
})

  it('renders without crashing', () => {
    let mountedInvitees = shallow(<Invitees/>)
  });


  it('contains at least 1 participant', () => {
    const participant = mountedInvitees.find('Participant');
    expect(participant.length).toBe(1)

  })
})
