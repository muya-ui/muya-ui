import React from 'react';
import renderer from 'react-test-renderer';
import CheckBoxCard from './CheckBoxCard';
import { mount } from 'enzyme';

describe('CheckBoxCard', () => {
  it('should render success', function() {
    const wrapper = renderer
      .create(
        <>
          <CheckBoxCard defaultChecked={true}>测试</CheckBoxCard>
          <CheckBoxCard defaultChecked={false}>测试</CheckBoxCard>
          <CheckBoxCard checked={false} defaultChecked={true}>
            测试
          </CheckBoxCard>
          <CheckBoxCard checked={true}>测试</CheckBoxCard>
        </>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should trigger check', function() {
    const fn = jest.fn();
    const wrapper = mount(
      <CheckBoxCard defaultChecked={true} onChange={fn}>
        测试
      </CheckBoxCard>,
    );
    expect(wrapper.find('input').props().checked).toBe(true);
    wrapper.find('input').simulate('change');
    expect(fn.mock.calls).toHaveLength(1);

    const fn1 = jest.fn();
    const wrapper1 = mount(
      <CheckBoxCard defaultChecked={true} checked={false} onChange={fn1}>
        测试
      </CheckBoxCard>,
    );
    expect(wrapper1.find('input').props().checked).toBe(false);
    wrapper1.find('input').simulate('change');
    expect(fn1.mock.calls).toHaveLength(1);
  });
});
