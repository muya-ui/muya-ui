import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import { ISwipeManager } from './types';
import useSwipe from './useSwipe';

test('测试 useSwipe 默认情况', () => {
  let currentIndex = 1;
  let currentItemIndex = 1;
  let currentSize = 3;
  const manager: ISwipeManager = {
    get index() {
      return currentIndex;
    },
    get itemIndex() {
      return currentItemIndex;
    },
    get hasNext() {
      return true;
    },
    get hasPrev() {
      return true;
    },
    get hasNextItem() {
      return true;
    },
    get hasPrevItem() {
      return true;
    },
    get maxOffset() {
      return 100;
    },
    get direction(): 'horizontal' {
      return 'horizontal';
    },
    get offset() {
      return 10;
    },
    get size() {
      return currentSize;
    },
    get itemSize() {
      return currentSize;
    },
    next() {},
    prev() {},
    goTo(stepKey) {},
    hasStep(stepKey) {
      return true;
    },
    getStepOffset(stepKey) {
      return 1;
    },
    nextItem() {},
    prevItem() {},
    goToItem(itemIndex) {},
    hasItem(itemIndex) {
      return true;
    },
    getItemOffset(itemIndex) {
      return 1;
    },
    getItemStep(itemIndex) {
      return 0;
    },
    updateOffset(offset) {},
  };
  const nextFn = sinon.spy(manager, 'next');
  const prevFn = sinon.spy(manager, 'prev');
  const goTo = sinon.spy(manager, 'goTo');
  const nextItemFn = sinon.spy(manager, 'nextItem');
  const prevItemFn = sinon.spy(manager, 'prevItem');
  const goToItem = sinon.spy(manager, 'goToItem');
  const { result } = renderHook(() => useSwipe());
  expect(result.current.stepIndex).toBe(0);
  act(() => {
    const e = {} as React.WheelEvent<HTMLDivElement>;
    result.current.onNext();
    result.current.onPrev();
    result.current.onGoTo(1);
    result.current.onWheel(e);

    result.current.onStepsChange(manager);
  });
  expect(result.current.stepSize).toBe(3);

  currentIndex = 2;
  act(() => {
    result.current.onNext();
  });
  expect(result.current.stepIndex).toBe(2);
  currentIndex = 3;
  act(() => {
    result.current.onPrev();
  });
  expect(result.current.stepIndex).toBe(3);
  currentIndex = 4;
  act(() => {
    result.current.onGoTo(4);
  });
  expect(result.current.stepIndex).toBe(4);
  expect(() => {
    sinon.assert.calledOnce(nextFn);
    sinon.assert.calledOnce(prevFn);
    sinon.assert.calledOnce(goTo);
  }).not.toThrow();

  currentItemIndex = 2;
  act(() => {
    result.current.onItemNext();
  });
  expect(result.current.itemIndex).toBe(2);
  currentItemIndex = 3;
  act(() => {
    result.current.onItemPrev();
  });
  expect(result.current.itemIndex).toBe(3);
  currentItemIndex = 4;
  act(() => {
    result.current.onItemGoTo(4);
  });
  expect(result.current.itemIndex).toBe(4);
  expect(() => {
    sinon.assert.calledOnce(nextItemFn);
    sinon.assert.calledOnce(prevItemFn);
    sinon.assert.calledOnce(goToItem);
  }).not.toThrow();

  act(() => {
    result.current.onWheelDisable();
  });
  act(() => {
    result.current.onWheelActive();
  });

  act(() => {
    result.current.onStepsChange(manager);
  });

  expect(result.current.stepIndex).toBe(2);

  act(() => {
    const e = {
      deltaX: 100,
      deltaY: 100,
    } as React.WheelEvent<HTMLDivElement>;
    result.current.onWheel(e);
  });

  act(() => {
    const e = {
      deltaX: 4,
      deltaY: 4,
    } as React.WheelEvent<HTMLDivElement>;
    result.current.onWheel(e);
  });
  expect(result.current.offset).toBe(14);
});
