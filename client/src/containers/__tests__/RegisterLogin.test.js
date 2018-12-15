import React from 'react';
import {shallow} from 'enzyme'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import RegisterLogin from '../RegisterLogin';

describe("RegisterLogin", function() {

  let mountedRegisterLogin
  beforeEach(()=>{
mountedRegisterLogin = shallow(<RegisterLogin/>)
})

  it('renders without crashing', () => {
    let mountedRegisterLogin = shallow(<RegisterLogin/>)
  });

  it('starts with 2 buttons', () => {
    const buttons = mountedRegisterLogin.find('button');
    expect(buttons.length).toBe(2)
  });

  it('contains the registration form', () => {
    // console.log(mountedInvitees.state())
    mountedRegisterLogin.setState({ showSection: 'register' })
    const registerForm = mountedRegisterLogin.find('RegisterUser');
    expect(registerForm.length).toBe(1)

  })

  it('contains the login form', () => {
    // console.log(mountedInvitees.state())
    mountedRegisterLogin.setState({ showSection: 'login' })
    const loginForm = mountedRegisterLogin.find('LoginUser');
    expect(loginForm.length).toBe(1)

  })

})
