import React from 'react';
import {shallow, mount} from 'enzyme'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import Header from '../Header';

let mountedHeader
beforeEach(()=>{
mountedHeader = shallow(<Header/>)
// const component = wrapper.Header();
})

  it('renders without crashing', () => {

    let mountedHeader = shallow(<Header/>)

  });

  it('contains image', () => {
    const imageLogo = mountedHeader.find('img');
    expect(imageLogo.length).toBe(1)

  })

  it('contains h1', () => {
    const pageTitle = mountedHeader.find('h1');
    expect(pageTitle.length).toBe(1)

  })
