import React from 'react';
import {shallow} from 'enzyme'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import Newevent from '../Newevent';

describe("Newevent", function() {

  let mountedNewevent
  beforeEach(()=>{
mountedNewevent = shallow(<Newevent/>)
})

  it('renders without crashing', () => {
    let mountedNewevent = shallow(<Newevent/>)
  });

  // incrementStage = () => {
  //     var stage = this.state.stage
  //     var nextStage = stage + 1
  //     this.setState({
  //       stage: nextStage
  //     })
  //   }

    it('increments state', () => {
      const instance = mountedNewevent.instance();
      instance.setState({ stage: 0 })
      instance.incrementStage()
      expect(mountedNewevent.state('stage')).toBe(1);
    })

    it('decrement state', () => {
      const instance = mountedNewevent.instance();
      instance.setState({ stage: 2 })
      instance.decrementStage()
      expect(mountedNewevent.state('stage')).toBe(1);
    })

    it('go back ', () => {
      const instance = mountedNewevent.instance();
      instance.setState({ stage: 2 })
      instance.goBack()
      expect(mountedNewevent.state('stage')).toBe(1);
    })

  it('stage 1 submit ', () => {
    const instance = mountedNewevent.instance();
    instance.setState({ stage: 0 })
    instance.Stage1Submit('t-name')
    expect(mountedNewevent.state('stage')).toBe(1);
    expect(mountedNewevent.state('teamName')).toBe('t-name');
  })

  it('stage 2 submit ', () => {
    const instance = mountedNewevent.instance();
    instance.setState({ stage: 1 })
    instance.Stage2Submit(['a','b'])
    expect(mountedNewevent.state('stage')).toBe(2);
    expect(mountedNewevent.state('invitees')).toEqual(['a','b']);
  })

  it('stage 3 submit ', () => {
    const instance = mountedNewevent.instance();
    // instance.setState({ stage: 2 })
    instance.Stage3Submit('eventTime', 'eventDate', 'payByDate', 'eventPricePP', 'message', 'eventPlace')
    // expect(mountedNewevent.state('stage')).toBe(3);
    expect(mountedNewevent.state('eventTime')).toEqual('eventTime');
  })

  // goBack = () => {
  //   this.decrementStage()
  //   // console.log("back")
  //   // console.log(this.state)
  //
  // }

  it('sets teamname', () => {
    const instance = mountedNewevent.instance();
    // instance.setState({ name: 'bar' })
    instance.setTeamName('name')
    expect(mountedNewevent.state('teamName')).toBe('name');
  })
  // it('contains form input fields', () => {
  //   const textfield = mountedNewevent.find('input');
  //   expect(textfield.length).toBe(4)
  //
  // })
  //
  // it('contains form textarea fields', () => {
  //   const textarea = mountedNewevent.find('textarea');
  //   expect(textarea.length).toBe(1)
  //
  // })
  //
  // it('contains form button fields', () => {
  //   const button = mountedNewevent.find('button');
  //   expect(button.length).toBe(1)
  //
  // })
  //
  // it('contains at least 1 participant', () => {
  //   const invitees = mountedNewevent.find('Invitees');
  //   expect(invitees.length).toBe(1)
  //
  // })
})
