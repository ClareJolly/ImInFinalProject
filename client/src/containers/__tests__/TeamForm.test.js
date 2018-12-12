import React from 'react';
import {shallow, mount} from 'enzyme'
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import TeamForm from '../TeamForm';

describe("TeamForm", function() {

//   let wrapper;
//   beforeEach(() => wrapper = shallow(<TeamForm />)
// const component = wrapper.instance());

let wrapper
beforeEach(()=>{
wrapper = shallow(<TeamForm defaultVal={'abc'}/>)
// const component = wrapper.instance();
})

  it('renders without crashing', () => {
    // const component = wrapper.instance();
    // component.setState({ teamName: 'abc' });
    // let wrapper = shallow(<TeamForm/>)
    const wrapper = shallow(<TeamForm defaultVal={'abc'}/>);
        // wrapper.setState({teamName: 'fsfsfsd'});
        // console.log(wrapper.state.teamName)
    expect(wrapper).toHaveLength(1);
  });

  it('contains form input fields', () => {
    // const component = wrapper.instance();
    // component.setState({ teamName: 'abc' });
    const textfield = wrapper.find('input');
    expect(textfield.length).toBe(1)

  })



  it('contains form button fields', () => {
    // const component = wrapper.instance();
    // component.setState({ teamName: 'abc' });
    const button = wrapper.find('button');
    expect(button.length).toBe(1)

  })


})
