import React from 'react';
import renderer from 'react-test-renderer';
import Card from './Card';
import { mount } from 'enzyme';

describe('Card', () => {
  it('should render success', function() {
    const wrapper = renderer
      .create(
        <>
          <Card>测试</Card>
          <Card extra={<span>1</span>}>测试</Card>
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render loading', function() {
    const wrapper = mount(<Card loading>测试</Card>);
    expect(wrapper.text()).toBe('');
  });
  it('should render wrapper style success', function() {
    const wrapper = renderer.create(
      <>
        <Card bordered>测试</Card>
        <Card shadowed={false}>测试</Card>
      </>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
