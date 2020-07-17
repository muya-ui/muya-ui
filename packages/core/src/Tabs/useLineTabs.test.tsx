import React from 'react';
import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import useLineTabs from './useLineTabs';
import useTabsBase from './useTabsBase';

jest.mock('./useTabsBase');

test('测试 useLineTabs 默认情况', async () => {
  const containerGetBoundingClientRect = sinon.stub();
  containerGetBoundingClientRect.returns({
    left: 0,
    width: 10,
  });
  const itemGetBoundingClientRect = sinon.stub();
  itemGetBoundingClientRect.returns({
    left: 10,
    width: 10,
  });
  const containerRef = {
    current: {
      getBoundingClientRect: containerGetBoundingClientRect,
    },
  };
  (useTabsBase as jest.Mock).mockReturnValue({
    children: <div>11</div>,
    selectedIndex: 0,
    items: [
      {
        ref: {
          current: {
            getBoundingClientRect: itemGetBoundingClientRect,
          },
        },
      },
    ],
  });

  const { result } = renderHook(() =>
    useLineTabs(
      {
        children: (
          <>
            <div>ss</div>
            <div>ss</div>
            <div>ss</div>
          </>
        ),
      },
      containerRef as any,
    ),
  );

  // await waitForNextUpdate();
  expect(result.current.indicatorState.transition).toBe('off');
  expect(result.current.indicatorState.left).toBe(10);

  act(() => {
    result.current.onContainerChange(20);
  });
  expect(result.current.indicatorState.left).toBe(0);
  act(() => {
    result.current.onContainerChange(-20);
  });
  expect(result.current.indicatorState.left).toBe(10);
  act(() => {
    result.current.onContainerChange(5);
    itemGetBoundingClientRect.returns({
      left: 10,
      width: 20,
    });
  });
  expect(result.current.indicatorState.left).toBe(10);

  await act(async () => {
    await result.current.resizeCheck();
  });

  act(() => {
    result.current.onContainerChange();
  });
  act(() => {
    result.current.updateIndicator();
  });
});

test('测试 useLineTabs items.length === 0', async () => {
  const containerGetBoundingClientRect = sinon.stub();
  containerGetBoundingClientRect.returns({
    left: 0,
    width: 10,
  });
  const itemGetBoundingClientRect = sinon.stub();
  itemGetBoundingClientRect.returns({
    left: 10,
    width: 10,
  });
  const containerRef = {
    current: {
      getBoundingClientRect: containerGetBoundingClientRect,
    },
  };
  (useTabsBase as jest.Mock).mockReturnValue({
    children: <div>11</div>,
    selectedIndex: 0,
    items: [],
  });

  const { result } = renderHook(() =>
    useLineTabs(
      {
        children: (
          <>
            <div>ss</div>
            <div>ss</div>
            <div>ss</div>
          </>
        ),
      },
      containerRef as any,
    ),
  );

  // await waitForNextUpdate();
  expect(result.current.indicatorState.transition).toBe('off');
  expect(result.current.indicatorState.left).toBe(0);
});
