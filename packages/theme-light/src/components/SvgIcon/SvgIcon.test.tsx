import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import SvgIcon from './index';

test('测试普通渲染', () => {
  const fakeChildren = (
    <>
      <div key="1">1</div>
      <div key="2">2</div>
      <div key="3">3</div>
    </>
  );
  const wrapper = shallow(<SvgIcon>{fakeChildren}</SvgIcon>);
  // receive all children
  expect(wrapper.find('div')).toHaveLength(3);
});

test('测试设置颜色', () => {
  const tree = renderer.create(<SvgIcon color="red" />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('color', 'red');
});

test('测试设置大小', () => {
  const tree = renderer.create(<SvgIcon fontSize="24px" />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('font-size', '24px');
});

test('测试图标背景元素', () => {
  const wrapper = shallow(<SvgIcon bgColor="#fff"></SvgIcon>);
  // should show bg element
  expect(wrapper.find('rect')).toHaveLength(1);
});
