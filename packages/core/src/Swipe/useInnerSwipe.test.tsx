import React from 'react';
import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import * as useBaseSwipe from './useBaseSwipe';
import useInnerSwipe from './useInnerSwipe';

const defaultItems = [
  { width: 60, height: 10, top: 0, bottom: 10, right: 60, left: 0 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 120, left: 60 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 180, left: 120 },
  { width: 60, height: 10, top: 0, bottom: 10, right: 240, left: 180 },
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

test('测试 useInnerSwipe 一般情况情况', async () => {
  const containerRef = React.createRef<HTMLDivElement>();
  (containerRef as any).current = {
    getBoundingClientRect() {
      return {
        width: 100,
        height: 100,
      };
    },
  };
  const { result } = renderHook((stepIndex: number = 0) =>
    useInnerSwipe(
      {
        stepIndex,
      },
      containerRef,
    ),
  );

  // 不引起任何状态变化，直接调用不出错
  result.current.handleRectChange([], containerRect);
  act(() => {
    result.current.handleRectChange(defaultItems, containerRect);
  });
  expect(result.current.transitionStatus).toBe('off');
});

test('测试 useInnerSwipe itemIndex', async () => {
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
  const { result } = renderHook((itemIndex: number = 0) =>
    useInnerSwipe(
      {
        itemIndex,
        onStepsChange,
        direction: 'vertical',
      },
      containerRef,
    ),
  );
  act(() => {
    result.current.handleRectChange(defaultItems, containerRect);
  });
});

test('测试 useInnerSwipe offset', async () => {
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
  const { result } = renderHook((itemIndex: number = 0) =>
    useInnerSwipe(
      {
        itemIndex,
        onStepsChange,
        offset: 10,
        direction: 'vertical',
      },
      containerRef,
    ),
  );
  expect(result.current.finalOffset).toBe(10);
});
