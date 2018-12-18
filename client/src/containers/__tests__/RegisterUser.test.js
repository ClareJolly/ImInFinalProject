import React from 'react';
import {shallow} from 'enzyme'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import RegisterUser from '../RegisterUser';

describe("RegisterUser", function() {

  let mountedRegisterUser
  beforeEach(()=>{
mountedRegisterUser = shallow(<RegisterUser />)
})

  it('renders without crashing', () => {
    let mountedRegisterUser = shallow(<RegisterUser />)
  });

  it('checks a mobile number', () => {
    const instance = mountedRegisterUser.instance();
    var x = instance.isMobile('07777777777');
    expect(x).toBe(true);
  })

  it('checks a non mobile number', () => {
    const instance = mountedRegisterUser.instance();
    var x = instance.isMobile('12345');
    expect(x).toBe(false);
  })

  it('checks a mobile number', () => {
    const instance = mountedRegisterUser.instance();
    var x = instance.validatePhoneNumbers('07777777777');
    expect(x).toBe(true);
  })

  it('checks a non mobile number', () => {
    const instance = mountedRegisterUser.instance();
    var x = instance.validatePhoneNumbers('12345');
    expect(x).toBe(false);
  })

  it('saves data to state', () => {

    // const mountedRegisterUser = shallow(<RegisterUser />);
    // mountedRegisterUser.setState({ name: 'bar' })
    // mountedRegisterUser.find('#name').simulate('change', {target: {value: 'cats'}});
    // console.log(mountedRegisterUser.state('name'))
    // expect(mountedRegisterUser.state('name')).toEqual('cats');

    // expect(userState).toEqual('abc');


  })

})
