import React from 'react';
import {shallow, mount} from 'enzyme'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import Participant from '../Participant';


let mountedParticipant
beforeEach(()=>{
mountedParticipant = shallow(<Participant/>)
// const component = wrapper.Header();
})

it('renders without crashing', () => {
  mountedParticipant = shallow(<Participant/>)
});

it('checks a mobile number', () => {
  const instance = mountedParticipant.instance();
  var x = instance.isMobile('07777777777');
  expect(x).toBe(true);
})

it('checks a non mobile number', () => {
  const instance = mountedParticipant.instance();
  var x = instance.isMobile('12345');
  expect(x).toBe(false);
})

it('checks a mobile number', () => {
  const instance = mountedParticipant.instance();
  var x = instance.validatePhoneNumbers('07777777777');
  expect(x).toBe(true);
})

it('checks a non mobile number', () => {
  const instance = mountedParticipant.instance();
  var x = instance.validatePhoneNumbers('12345');
  expect(x).toBe(false);
})
