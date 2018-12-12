import React from 'react';
import {shallow} from 'enzyme'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import Newevent from '../Newevent';

describe("Newevent", function() {

  let mountedNewevent
  beforeEach(()=>{
mountedNewevent = shallow(<Newevent/>)
})

  it('renders without crashing', () => {
    let mountedNewevent = shallow(<Newevent/>)
  });

  // it('contains form input fields', () => {
  //   const textfield = mountedNewevent.find('input');
  //   expect(textfield.length).toBe(4)
  //
  // })
  //
  // it('contains form textarea fields', () => {
  //   const textarea = mountedNewevent.find('textarea');
  //   expect(textarea.length).toBe(1)
  //
  // })
  //
  // it('contains form button fields', () => {
  //   const button = mountedNewevent.find('button');
  //   expect(button.length).toBe(1)
  //
  // })
  //
  // it('contains at least 1 participant', () => {
  //   const invitees = mountedNewevent.find('Invitees');
  //   expect(invitees.length).toBe(1)
  //
  // })
})
