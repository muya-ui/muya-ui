import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import Carousel from './Carousel';
import { Index } from './IndexIndicator';
import PagerButton from './PagerButton';

test('测试 Carousel', () => {
  const tree = renderer
    .create(
      <>
        <Carousel animation="fade" imgs={['sss', 'sss']} lazy="off" />
        <Carousel animation="fade" imgs={['sss', 'sss']} lazy="off" arrow="none" />
        <Carousel animation="fade" imgs={['sss', 'sss']} lazy="off" arrow="hover" />
        <Carousel animation="fade" imgs={['sss', 'sss']} lazy="off" indicator="none" />
        <Carousel animation="fade" imgs={['sss', 'sss']} lazy="off" indicator="left" />
        <Carousel animation="fade" imgs={['sss', 'sss']} lazy="off" indicator="right" />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 IndexIndicator onChange', () => {
  const onChange = sinon.spy();
  const onMouseLeave = sinon.spy();
  const onMouseEnter = sinon.spy();

  const wrapper = mount(
    <Carousel
      animation="grow"
      imgs={['sss1', 'sss2', 'sss3']}
      onChange={onChange}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />,
  );
  expect(wrapper.find(Index)).toHaveLength(3);

  wrapper.simulate('mouseenter');
  wrapper.simulate('mouseleave');

  wrapper
    .find(Index)
    .first()
    .simulate('click');
  wrapper
    .find(Index)
    .last()
    .simulate('click');
  wrapper
    .find(PagerButton)
    .last()
    .simulate('click');
  wrapper
    .find(PagerButton)
    .last()
    .simulate('click');
  wrapper
    .find(PagerButton)
    .last()
    .simulate('click');
  wrapper
    .find(PagerButton)
    .first()
    .simulate('click');
  wrapper
    .find(PagerButton)
    .first()
    .simulate('click');
  wrapper
    .find(PagerButton)
    .first()
    .simulate('click');
  expect(() => {
    sinon.assert.calledWith(onChange, 'sss1', 0);
    sinon.assert.calledWith(onChange, 'sss2', 1);
    sinon.assert.calledWith(onChange, 'sss3', 2);
  }).not.toThrow();
});
