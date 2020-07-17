import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import Typography from '../Typography';
import DialogTitle from './Title';

test('should render correctly', () => {
  const tree = renderer.create(<DialogTitle>Test</DialogTitle>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('should hide close icon', () => {
  // 默认是有icon的
  const wrapperWithIcon = mount(<DialogTitle>Test</DialogTitle>);
  expect(wrapperWithIcon.find('svg')).toHaveLength(1);

  // 隐藏icon
  const wrapper = mount(<DialogTitle hideClose>Test</DialogTitle>);
  expect(wrapper.find('svg')).toHaveLength(0);
});

test('should call onClose', () => {
  const spy = sinon.spy();

  const wrapper = mount(<DialogTitle onClose={spy}>Test</DialogTitle>);
  const icon = wrapper.find('svg');
  icon.simulate('click');
  expect(spy.calledOnce).toBe(true);
});

test('should disable typography', () => {
  const wrapper = mount(
    <DialogTitle>
      <span>Test</span>
    </DialogTitle>,
  );

  const wrapperWithoutP = mount(
    <DialogTitle disableTypography>
      <span>Test</span>
    </DialogTitle>,
  );

  expect(wrapper.find(Typography.Title)).toHaveLength(1);
  expect(wrapperWithoutP.find(Typography.Title)).toHaveLength(0);
});

test('should accept closeIcon', () => {
  const wrapper = mount(<DialogTitle closeIcon={<div id="test"></div>}>Test</DialogTitle>);
  expect(wrapper.find('#test')).toHaveLength(1);
});
