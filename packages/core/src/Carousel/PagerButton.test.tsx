import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import * as sinon from 'sinon';

import PagerButton from './PagerButton';

test('测试 PagerButton 正常情况', () => {
  const tree = renderer
    .create(
      <>
        <PagerButton arrow="left" />
        <PagerButton arrow="right" />
        <PagerButton arrow="top" />
        <PagerButton arrow="bottom" />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 PagerButton disabled', () => {
  const tree = renderer.create(<PagerButton disabled />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('cursor', 'not-allowed');
});
test('测试 PagerButton shape circle', () => {
  const tree = renderer.create(<PagerButton shape="circle" />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('border-radius', '50%');
});

test('测试 PagerButton transparent', () => {
  const tree = renderer.create(<PagerButton transparent />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 PagerButton onClick disabled', () => {
  const onClick = sinon.spy();
  const wrapper = mount(<PagerButton disabled onClick={onClick} />);
  wrapper.simulate('click');
  expect(() => {
    sinon.assert.notCalled(onClick);
  }).not.toThrow();
});

test('测试 PagerButton onClick', () => {
  const onClick = sinon.spy();
  const wrapper = mount(<PagerButton onClick={onClick} />);
  wrapper.simulate('click');
  expect(() => {
    sinon.assert.calledOnce(onClick);
  }).not.toThrow();
});
