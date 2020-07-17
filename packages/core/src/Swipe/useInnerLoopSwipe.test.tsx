import React from 'react';
import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import * as useBaseSwipe from './useBaseSwipe';
import useInnerLoopSwipe from './useInnerLoopSwipe';

const defaultItems = [
  { width: 60, height: 10, top: 0, bottom: 10, right: 60, left: 0 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 120, left: 60 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 180, left: 120 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 240, left: 180 },
];
const cloneItems = [
  { width: 60, height: 10, top: 0, bottom: 10, right: 300, left: 240 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 360, left: 300 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 420, left: 360 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 480, left: 420 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 540, left: 480 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 600, left: 540 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 600, left: 660 },
];

const containerRect = { width: 70, height: 10, top: 0, bottom: 10, right: 70, left: 0 };

let mockHook: any;
beforeAll(() => {
  mockHook = sinon.stub(useBaseSwipe, 'default');
  mockHook.returns({
    nodes: null,
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

test('测试 useInnerLoopSwipe 一般情况情况', async () => {
  const containerRef = React.createRef<HTMLDivElement>();
  (containerRef as any).current = {
    getBoundingClientRect() {
      return {
        width: 100,
        height: 100,
      };
    },
  };
  const { result, rerender, waitForNextUpdate } = renderHook((stepIndex: number = 0) =>
    useInnerLoopSwipe(
      {
        stepIndex,
      },
      containerRef,
    ),
  );
  // 不引起任何状态变化，直接调用不出错
  result.current.handleRectChange([], containerRect, []);
  result.current.resetPosition();
  act(() => {
    result.current.handleRectChange(defaultItems, containerRect, cloneItems);
  });
  expect(result.current.transitionStatus).toBe('off');

  rerender(2);
  result.current.swipeManager.current!.lock();
  await waitForNextUpdate();
});

test('测试 useInnerLoopSwipe itemIndex', async () => {
  const containerRef = React.createRef<HTMLDivElement>();
  (containerRef as any).current = {
    getBoundingClientRect() {
      return {
        width: 100,
        height: 100,
      };
    },
  };
  const onStepsChange = sinon.spy();
  const { result, rerender } = renderHook((itemIndex: number = 0) =>
    useInnerLoopSwipe(
      {
        itemIndex,
        onStepsChange,
        direction: 'vertical',
      },
      containerRef,
    ),
  );
  // 不引起任何状态变化，直接调用不出错
  result.current.handleRectChange([], containerRect, []);
  result.current.resetPosition();
  act(() => {
    result.current.handleRectChange(defaultItems, containerRect, cloneItems);
  });
  expect(result.current.transitionStatus).toBe('off');

  rerender(2);
});
