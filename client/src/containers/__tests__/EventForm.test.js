import React from 'react';
import {shallow} from 'enzyme'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import EventForm from '../EventForm';

describe("EventForm", function() {

  let mountedEventForm
  beforeEach(()=>{
mountedEventForm = shallow(<EventForm/>)
})

  it('renders without crashing', () => {
    let mountedEventForm = shallow(<EventForm/>)
  });

  it('contains form input fields', () => {
    const textfield = mountedEventForm.find('input');
    expect(textfield.length).toBe(5)

  })

  // it('contains form textarea fields', () => {
  //   const textarea = mountedEventForm.find('textarea');
  //   expect(textarea.length).toBe(1)
  //
  // })

  it('contains form button fields', () => {
    const button = mountedEventForm.find('button');
    expect(button.length).toBe(2)

  })


})
