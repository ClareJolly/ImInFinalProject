import React from 'react';
import {shallow} from 'enzyme'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import Events from '../Events';

describe("Events", function() {

  let mountedEvents
  beforeEach(()=>{
mountedEvents = shallow(<Events/>)
})

  it('renders without crashing', () => {
    let mountedEvents = shallow(<Events/>)
  });

  // it('contains a list', () => {
  //   const list = mountedEvents.find('li');
  //   expect(list.length).toBe(4)
  //
  // })

  it('contains a H2', () => {
    const h2 = mountedEvents.find('h2');
    expect(h2.length).toBe(1)

  })

  it('contains a List', () => {
    const list = mountedEvents.find('li');
    expect(list.length).toBe(0)

  })

  // it('contains form button fields', () => {
  //   const button = mountedEvents.find('button');
  //   expect(button.length).toBe(1)
  //
  // })
  //
  // it('contains at least 1 participant', () => {
  //   const invitees = mountedEvents.find('Invitees');
  //   expect(invitees.length).toBe(1)
  //
  // })
})
