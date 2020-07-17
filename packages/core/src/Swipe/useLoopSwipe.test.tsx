import sinon from 'sinon';

import { act, renderHook } from '@testing-library/react-hooks';

import { ILoopSwipeManager, ISwipeDirection } from './types';
import useLoopSwipe from './useLoopSwipe';

test('测试 useLoopSwipe 默认情况', () => {
  let currentIndex = 1;
  let currentItemIndex = 1;
  let realItemIndex = 1;
  const manager: ILoopSwipeManager = {
    get index() {
      return currentIndex++;
    },
    get itemIndex() {
      return currentItemIndex++;
    },
    get realItemIndex() {
      return realItemIndex++;
    },
    get offset() {
      return 10;
    },
    get size() {
      return 3;
    },
    get itemSize() {
      return 3;
    },
    get realItemSize() {
      return 6;
    },
    get direction() {
      return 'vertical' as ISwipeDirection;
    },
    get locked() {
      return false;
    },
    lock() {},
    unlock() {},
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
    updateOffset(offset) {},
  };
  const nextFn = sinon.spy(manager, 'next');
  const prevFn = sinon.spy(manager, 'prev');
  const goTo = sinon.spy(manager, 'goTo');
  const nextItemFn = sinon.spy(manager, 'nextItem');
  const prevItemFn = sinon.spy(manager, 'prevItem');
  const goToItem = sinon.spy(manager, 'goToItem');
  const { result } = renderHook(() => useLoopSwipe());
  act(() => {
    result.current.onNext();
    result.current.onPrev();
    result.current.onGoTo(1);
    result.current.onStepsChange(manager);
  });
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

  realItemIndex = 2;
  act(() => {
    result.current.onItemNext();
  });
  expect(result.current.itemIndex).toBe(2);
  realItemIndex = 3;
  act(() => {
    result.current.onItemPrev();
  });
  expect(result.current.itemIndex).toBe(3);
  realItemIndex = 4;
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
    result.current.onStepsChange(manager);
  });

  expect(result.current.stepIndex).toBe(2);
});
