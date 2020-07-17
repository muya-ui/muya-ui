import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import Swipe from './Swipe';
import * as useBaseSwipe from './useBaseSwipe';

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

test('测试 Swipe 正常情况', () => {
  const tree = renderer
    .create(
      <Swipe stepIndex={0}>
        <div>AAA</div>
      </Swipe>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 Swipe 垂直方向', () => {
  const tree = renderer
    .create(
      <Swipe stepIndex={0} direction="vertical">
        <div>AAA</div>
      </Swipe>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
