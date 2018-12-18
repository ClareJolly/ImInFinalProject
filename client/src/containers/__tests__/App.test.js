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

// setLogout() {
//     // console.log("toggle?")
//     sessionStorage.clear()
//     this.setState({user: '',userID:'', loggedIn:false})
//     this.showSection('home')
//     this.toast_logout()
//
//   }

  it('sets logout', () => {
    // sessionStorage.setItem('username','test')
    const instance = mountedApp.instance();
    // instance.setState({ currentView: 'home' })
    instance.setLogout()
    expect(mountedApp.state('user')).toBe('');
    expect(mountedApp.state('userID')).toBe('');
    expect(mountedApp.state('loggedIn')).toBe(false);
    expect(mountedApp.state('currentView')).toBe('home');
  })
it('sets user', () => {
  // sessionStorage.setItem('username','test')
  const instance = mountedApp.instance();
  // instance.setState({ currentView: 'home' })
  instance.setUser('user','userID')
  expect(mountedApp.state('user')).toBe('user');
  expect(mountedApp.state('userID')).toBe('userID');
  expect(mountedApp.state('loggedIn')).toBe(true);
})

 it('sets section', () => {
   // sessionStorage.setItem('username','test')
   const instance = mountedApp.instance();
   instance.setState({ currentView: 'home' })
   instance.showSection('events')
   expect(mountedApp.state('currentView')).toBe('events');
 })

    it('checks cookie setting', () => {
      // sessionStorage.setItem('username','test')
      const instance = mountedApp.instance();
      instance.setState({ cookieaccept: false })
      instance.cookieSet()
      expect(mountedApp.state('cookieaccept')).toBe(true);
    })

    it('set eventID', () => {
      // sessionStorage.setItem('username','test')
      const instance = mountedApp.instance();
      instance.setState({ currentView: 'home' })
      instance.setEventID({event:'test'})
      expect(mountedApp.state('currentView')).toBe('viewEvent');
    })
