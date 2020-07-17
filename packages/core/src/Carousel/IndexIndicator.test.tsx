import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import * as sinon from 'sinon';

import IndexIndicator, { Index } from './IndexIndicator';

test('测试 IndexIndicator', () => {
  const tree = renderer.create(<IndexIndicator index={0} num={10} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 IndexIndicator onChange', () => {
  const onChange = sinon.spy();
  const wrapper = mount(<IndexIndicator index={0} num={10} onChange={onChange} />);
  expect(wrapper.find(Index)).toHaveLength(10);
  wrapper
    .find(Index)
    .first()
    .simulate('click');
  wrapper
    .find(Index)
    .last()
    .simulate('click');
  expect(() => {
    sinon.assert.calledOnce(onChange);
    sinon.assert.calledWith(onChange, 9);
  }).not.toThrow();
});
