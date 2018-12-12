import React from 'react';
import {shallow, mount} from 'enzyme'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import WelcomeText from '../WelcomeText';

let mountedWelcomeText
beforeEach(()=>{
mountedWelcomeText = shallow(<WelcomeText/>)
// const component = wrapper.Header();
})

  it('renders without crashing', () => {

    let mountedWelcomeText = shallow(<WelcomeText/>)

  })

  it('contains div', () => {
    const welcometext = mountedWelcomeText.find('div');
    expect(welcometext.length).toBe(2)

  })
