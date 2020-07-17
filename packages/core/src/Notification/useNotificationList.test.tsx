import { RefObject } from 'react';
// import { mount } from 'enzyme';
import sinon from 'sinon';

import { wait } from '@muya-ui/utils';
import { renderHook } from '@testing-library/react-hooks';

import ExpireQueue from './ExpireQueue';
import { INotificationItem, INotificationListPureProps } from './types';
import useNotificationList from './useNotificationList';

type HookReturn = ReturnType<typeof useNotificationList>;

test('测试 useNotificationList 正常执行', async () => {
  const expireQueue = new ExpireQueue<INotificationItem>();
  const tick = sinon.spy(expireQueue, 'tick');
  const stop = sinon.spy(expireQueue, 'stop');
  const containerRef: RefObject<HTMLDivElement> = {
    current: null,
  };

  const { result, unmount } = renderHook(() =>
    useNotificationList(
      {
        expireQueue,
        position: 'top-center',
      },
      containerRef,
    ),
  );
  const event = {};
  tick.resetHistory();
  stop.resetHistory();
  result.current.handleMouseEnter(event as React.MouseEvent<HTMLDivElement, MouseEvent>);
  result.current.handleMouseLeave(event as React.MouseEvent<HTMLDivElement, MouseEvent>);
  expect(() => {
    sinon.assert.notCalled(tick);
    sinon.assert.notCalled(stop);
  }).not.toThrow();
  unmount();
});

test('测试 useNotificationList 满屏移出逻辑', async () => {
  const expireQueue = new ExpireQueue<INotificationItem>();
  const shift = sinon.stub(expireQueue, 'shift');
  expireQueue.reset({
    interval: 10,
    timeout: 10,
    max: 2,
  });
  (window as any).innerHeight = 100;
  const el = {
    getBoundingClientRect() {
      return {
        top: -10,
        bottom: 1000,
      };
    },
  };
  const getBoundingClientRect = sinon.stub(el, 'getBoundingClientRect');
  getBoundingClientRect.returns({
    top: -10,
    bottom: 1000,
  });
  const containerRef: RefObject<HTMLDivElement> = {
    current: el as HTMLDivElement,
  };

  const { rerender } = renderHook<Pick<INotificationListPureProps, 'position'>, HookReturn>(
    ({ position }) =>
      useNotificationList(
        {
          expireQueue,
          fullScreen: true,
          position,
        },
        containerRef,
      ),
    {
      initialProps: {
        position: 'top-center',
      },
    },
  );
  await wait.time(30);
  expect(() => {
    sinon.assert.calledOnce(shift);
  }).not.toThrow();
  const pop = sinon.stub(expireQueue, 'pop');
  rerender({ position: 'bottom-left' });
  await wait.time(30);
  expect(() => {
    sinon.assert.calledOnce(pop);
  }).not.toThrow();
  getBoundingClientRect.reset();
  getBoundingClientRect.returns({
    top: 0,
    bottom: 0,
  });
  rerender({ position: 'bottom-left' });
  await wait.time(30);
});

test('测试 useNotificationList 停驻逻辑', async () => {
  const expireQueue = new ExpireQueue<INotificationItem>();
  const containerRef: RefObject<HTMLDivElement> = { current: null };

  const stop = sinon.stub(expireQueue, 'stop');
  const tick = sinon.stub(expireQueue, 'tick');
  const { result } = renderHook(() =>
    useNotificationList(
      {
        expireQueue,
        hoverStop: true,
        position: 'top-center',
      },
      containerRef,
    ),
  );
  const e = {};
  result.current.handleMouseEnter(e as React.MouseEvent<HTMLDivElement>);
  result.current.handleMouseLeave(e as React.MouseEvent<HTMLDivElement>);
  expect(() => {
    sinon.assert.called(stop);
    sinon.assert.called(tick);
  }).not.toThrow();
});
