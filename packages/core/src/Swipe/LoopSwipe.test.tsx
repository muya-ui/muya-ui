import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import LoopSwipe from './LoopSwipe';
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

test('测试 LoopSwipe 正常情况', () => {
  const tree = renderer
    .create(
      <LoopSwipe stepIndex={0}>
        <div>AAA</div>
      </LoopSwipe>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('测试 LoopSwipe 垂直方向', () => {
  const tree = renderer
    .create(
      <LoopSwipe stepIndex={0} direction="vertical">
        <div>AAA</div>
      </LoopSwipe>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
