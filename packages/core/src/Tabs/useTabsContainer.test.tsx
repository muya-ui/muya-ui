import { mount } from 'enzyme';
import React, { forwardRef, useEffect } from 'react';
import sinon from 'sinon';
import mockConsole from 'test/utils/mockConsole';

import { ISwipeDirection, ISwipeManager, useSwipe } from '../Swipe';
import useTabsContainer from './useTabsContainer';

jest.mock('../Swipe');

beforeAll(() => {
  mockConsole.restoreError();
  mockConsole.mockError();
});

afterAll(() => {
  mockConsole.restoreError();
});

const manager: ISwipeManager = {
  get index() {
    return 1;
  },
  get itemIndex() {
    return 1;
  },
  get offset() {
    return 1;
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
  get size() {
    return 3;
  },
  get itemSize() {
    return 3;
  },
  get maxOffset() {
    return 3;
  },
  get direction() {
    return 'horizontal' as ISwipeDirection;
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
test('测试 useTabsContainer', () => {
  const useSwipeMock = useSwipe as jest.Mock;
  useSwipeMock.mockReturnValue({
    onPrev: jest.fn(() => {}),
    onNext: jest.fn(() => {}),
    onStepsChange: jest.fn(() => {}),
    hasNext: true,
    hasPrev: true,
    stepIndex: 11,
    steps: {
      getStepOffset() {
        return 11;
      },
    },
  });
  const Comp = forwardRef<HTMLDivElement, any>((props, ref) => {
    const {
      onPrev,
      onNext,
      onStepsChange,
      hasNext,
      hasPrev,
      stepIndex,
      onTransitionEnd,
    } = useTabsContainer({
      onChange: sinon.spy(),
    });
    useEffect(() => {
      onPrev();
      onNext();
      onTransitionEnd();
      onStepsChange(manager);
      expect(hasNext).toBe(true);
      expect(hasPrev).toBe(true);
      expect(stepIndex).toBe(11);
    });
    return <div ref={ref}></div>;
  });
  mount(<Comp></Comp>);
});
test('测试 useTabsContainer no steps', () => {
  const useSwipeMock = useSwipe as jest.Mock;
  useSwipeMock.mockReturnValue({
    onPrev: jest.fn(() => {}),
    onNext: jest.fn(() => {}),
    onStepsChange: jest.fn(() => {}),
    hasNext: true,
    hasPrev: true,
    stepIndex: 11,
  });
  const Comp = forwardRef<HTMLDivElement, any>((props, ref) => {
    const { onPrev } = useTabsContainer({
      onChange: sinon.spy(),
    });
    useEffect(() => {
      onPrev();
    });
    return <div ref={ref}></div>;
  });
  mount(<Comp></Comp>);
});

test('测试 useTabsContainer no change', () => {
  const useSwipeMock = useSwipe as jest.Mock;
  useSwipeMock.mockReturnValue({
    onPrev: jest.fn(() => {}),
    onNext: jest.fn(() => {}),
    onStepsChange: jest.fn(() => {}),
    hasNext: true,
    hasPrev: true,
    stepIndex: 11,
    steps: {
      getStepOffset() {
        return 0;
      },
    },
  });
  const Comp = forwardRef<HTMLDivElement, any>((props, ref) => {
    const { onPrev } = useTabsContainer({
      onChange: sinon.spy(),
    });
    useEffect(() => {
      onPrev();
    });
    return <div ref={ref}></div>;
  });
  mount(<Comp></Comp>);
});
