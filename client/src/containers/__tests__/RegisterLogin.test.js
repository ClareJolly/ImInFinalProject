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

  it('contains the register button', () => {
    // console.log(mountedInvitees.state())
    mountedRegisterLogin.setState({ showSection: '' })
    const reg_button = mountedRegisterLogin.find('#register');
    expect(reg_button.text()).toEqual('Register')

  })
  it('contains the login button', () => {
    // console.log(mountedInvitees.state())
    mountedRegisterLogin.setState({ showSection: '' })
    const log_button = mountedRegisterLogin.find('#login');
    expect(log_button.text()).toEqual('Login')

  })

  // show(section)
  it('Checks section setting', () => {
    const instance = mountedRegisterLogin.instance();
    // instance.setState({ name: 'bar' })
    instance.show('section')
    expect(mountedRegisterLogin.state('showSection')).toBe('section');
  })

  // UserLogin = (username, password) => {
  //   this.CheckLogin(username,password)
  // }

  // it('Checks User reg set state', () => {
  //   const instance = mountedRegisterLogin.instance();
  //   // instance.setState({ name: 'bar' })
  //   instance.UserLogin('username', 'password')
  //   console.log(mountedRegisterLogin.state('loginStatus'))
  //   expect(mountedRegisterLogin.state('loginStatus')).toBe(true);
  // })

  it('Checks User reg set state', () => {
    const instance = mountedRegisterLogin.instance();
    // instance.setState({ name: 'bar' })
    instance.UserRegister('name', 'username', 'phoneNumber', 'password')
    expect(mountedRegisterLogin.state('username')).toBe('username');
  })

})
