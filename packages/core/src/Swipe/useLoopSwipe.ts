import { useRef, useState } from 'react';
import { shallowEqualObjects } from 'shallow-equal';

import { useEventCallback } from '@muya-ui/utils';

import { ILoopSwipeHookState, ILoopSwipeManager } from './types';

type IState = Pick<
  ILoopSwipeHookState,
  'loop' | 'stepIndex' | 'stepSize' | 'itemIndex' | 'itemSize' | 'transitionStatus'
>;

export default function useLoopSwipe(): ILoopSwipeHookState {
  const [state, setState] = useState<IState>({
    itemIndex: 0,
    stepIndex: 0,
    stepSize: 0,
    itemSize: 0,
    loop: false,
    transitionStatus: 'off',
  });
  const swipeManager = useRef<ILoopSwipeManager>();
  const updateState = () => {
    const manager = swipeManager.current!;
    const { index, size, realItemIndex, itemSize, realItemSize } = manager;
    setState({
      loop: itemSize > realItemSize,
      stepIndex: index,
      stepSize: size,
      itemIndex: realItemIndex,
      itemSize: realItemSize,
    });
  };
  const firstStepsChange = useRef(true);
  const onStepsChange = useEventCallback((manager: ILoopSwipeManager) => {
    swipeManager.current = manager;
    const { index, size, realItemIndex, itemSize, realItemSize } = manager;
    const newState: IState = {
      stepIndex: firstStepsChange.current ? index : state.stepIndex,
      stepSize: size,
      itemIndex: firstStepsChange.current ? realItemIndex : state.itemIndex,
      itemSize: realItemSize,
      loop: itemSize > realItemSize,
      transitionStatus: 'off',
    };
    firstStepsChange.current = false;
    // 步长发生了变化，极限情况处理一下
    if (newState.stepIndex !== undefined && newState.stepIndex >= manager.size) {
      newState.stepIndex = manager.size - 1;
    }
    if (!shallowEqualObjects(state, newState)) {
      setState(newState);
    }
  });
  const onPrev = useEventCallback(() => {
    const manager = swipeManager.current;
    if (manager) {
      manager.prev();
      updateState();
    }
  });
  const onNext = useEventCallback(() => {
    const manager = swipeManager.current;
    if (manager) {
      manager.next();
      updateState();
    }
  });
  const onGoTo = useEventCallback((stepIndex: number) => {
    const manager = swipeManager.current;
    if (manager && manager.hasStep(stepIndex)) {
      manager.goTo(stepIndex);
      updateState();
    }
  });
  const onItemPrev = useEventCallback(() => {
    const manager = swipeManager.current;
    if (manager) {
      manager.prevItem();
      updateState();
    }
  });
  const onItemNext = useEventCallback(() => {
    const manager = swipeManager.current;
    if (manager) {
      manager.nextItem();
      updateState();
    }
  });
  const onItemGoTo = useEventCallback((itemIndex: number) => {
    const manager = swipeManager.current;
    if (manager && manager.hasItem(itemIndex)) {
      manager.goToItem(itemIndex);
      updateState();
    }
  });
  return {
    ...state,
    manager: swipeManager.current,
    onStepsChange,
    onNext,
    onPrev,
    onGoTo,
    onItemNext,
    onItemPrev,
    onItemGoTo,
  };
}
