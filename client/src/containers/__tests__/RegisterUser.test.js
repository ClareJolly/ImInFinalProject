import React from 'react';
import {shallow} from 'enzyme'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import RegisterUser from '../RegisterUser';

describe("RegisterUser", function() {

  let mountedRegisterUser
  beforeEach(()=>{
mountedRegisterUser = shallow(<RegisterUser/>)
})

  it('renders without crashing', () => {
    let mountedEvents = shallow(<RegisterUser/>)
  });

})
