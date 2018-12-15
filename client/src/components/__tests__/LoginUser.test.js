import React from 'react';
import {shallow} from 'enzyme'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import LoginUser from '../LoginUser';

describe("LoginUser", function() {

  let mountedLoginUser
  beforeEach(()=>{
mountedLoginUser = shallow(<LoginUser/>)
})

  it('renders without crashing', () => {
    let mountedLoginUser = shallow(<LoginUser/>)
  });

})
