import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import * as useBaseSwipe from '../Swipe/useBaseSwipe';
import Carousel from './Carousel';

let mockHook: any;
beforeAll(() => {
  mockHook = sinon.stub(useBaseSwipe, 'default');
  mockHook.returns({
    nodes: '1111',
    finalDuration: 10,
    state: {
      status: 'done',
      cloneNum: 0,
    },
    shouldUpdateContainer: async () => {},
  });
});
afterAll(() => {
  mockHook.restore();
});

test('测试 SwipeCarousel', () => {
  const tree = renderer
    .create(
      <>
        <Carousel imgs={['sss', 'sss']} />
        <Carousel imgs={['sss', 'sss']} arrow="none" />
        <Carousel imgs={['sss', 'sss']} arrow="hover" />
        <Carousel imgs={['sss', 'sss']} indicator="none" />
        <Carousel imgs={['sss', 'sss']} indicator="left" />
        <Carousel imgs={['sss', 'sss']} indicator="right" />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 SwipeCarousel 空数组', () => {
  const tree = renderer.create(<Carousel imgs={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 SwipeCarousel 复杂节点', () => {
  const tree = renderer.create(<Carousel imgs={[{ imgSrc: 'ss' }]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
