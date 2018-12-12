import React from 'react';
import {shallow, mount} from 'enzyme'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import App from '../App';


let mountedApp
beforeEach(()=>{
mountedApp = shallow(<App/>)
// const component = wrapper.Header();
})

it('renders without crashing', () => {
  let mountedApp = shallow(<App/>)
});

it('contains a header', () => {
  const header = mountedApp.find('Header');
      // wrapper.setState({teamName: 'fsfsfsd'});
      // console.log(wrapper.state.teamName)
  expect(header).toHaveLength(1);
});
