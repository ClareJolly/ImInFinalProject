import React from 'react';
import {shallow, mount} from 'enzyme'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import ViewEvent from '../ViewEvent';

let mountedViewEvent
let mocked_props
beforeEach(()=>{
mocked_props = {
  eventPlace : 'London',
  eventDate : '01/01/2019',
  eventTime : '00:00',
  message : 'message',
  invitees : [{part_name:"abc", part_number:"123"}],
  invitees_new : [{part_name:"abc", part_number:"123"}]
}
mountedViewEvent = shallow(<ViewEvent event={mocked_props} response={'this is a test message'}/>)
// const component = wrapper.Header();
})

  it('renders without crashing', () => {

    let mountedViewEvent = shallow(<ViewEvent event={mocked_props} response={'this is a test message'}/>)

  })

  it('contains div', () => {
    const event_text = mountedViewEvent.find('h3');
    expect(event_text.text()).toEqual('this is a test message')

  })
