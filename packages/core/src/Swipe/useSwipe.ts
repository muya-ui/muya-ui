import { useCallback, useRef, useState } from 'react';
import { shallowEqualObjects } from 'shallow-equal';

import { useEventCallback, useLockScroll } from '@muya-ui/utils';

import { ISwipeHookState, ISwipeManager } from './types';

type IState = Pick<
  ISwipeHookState,
  | 'stepIndex'
  | 'hasNext'
  | 'hasPrev'
  | 'stepSize'
  | 'itemIndex'
  | 'itemSize'
  | 'hasNextItem'
  | 'hasPrevItem'
  | 'offset'
  | 'transitionStatus'
>;

export default function useSwipe(): ISwipeHookState {
  const [state, setState] = useState<IState>({
    itemIndex: 0,
    stepIndex: 0,
    offset: 0,
    hasNext: false,
    hasPrev: false,
    stepSize: 0,
    hasNextItem: false,
    hasPrevItem: false,
    itemSize: 0,
    transitionStatus: 'off',
  });
  const [active, setActive] = useState(false);
  const swipeManager = useRef<ISwipeManager>();
  const updateState = (newOffset?: number) => {
    const manager = swipeManager.current!;
    const {
      index,
      hasNext,
      hasPrev,
      size,
      itemIndex,
      hasNextItem,
      hasPrevItem,
      itemSize,
    } = manager;
    setState({
      hasNext,
      hasPrev,
      stepIndex: index,
      stepSize: size,
      offset: newOffset,
      itemIndex,
      hasNextItem,
      hasPrevItem,
      itemSize,
      transitionStatus: 'on',
    });
  };
  const firstStepsChange = useRef(true);
  const onStepsChange = useEventCallback((manager: ISwipeManager) => {
    swipeManager.current = manager;
    const newState: IState = {
      transitionStatus: 'off',
      stepIndex: firstStepsChange.current ? manager.index : state.stepIndex,
      stepSize: manager.size,
      hasNext: manager.hasNext,
      hasPrev: manager.hasPrev,
      itemIndex: firstStepsChange.current ? manager.itemIndex : state.itemIndex,
      hasNextItem: manager.hasNextItem,
      hasPrevItem: manager.hasPrevItem,
      itemSize: manager.itemSize,
      offset: manager.offset,
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
  // 获取指定 item 所在的 step
  const getItemStep = (itemIndex: number) => {
    const manager = swipeManager.current;
    if (manager) {
      return manager.getItemStep(itemIndex);
    }
    return 0;
  };
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
  const onWheel = useEventCallback((e: Pick<React.WheelEvent, 'deltaX' | 'deltaY'>) => {
    const manager = swipeManager.current;
    if (!manager || !active) {
      return;
    }
    let diff = manager.direction === 'horizontal' ? e.deltaX : e.deltaY;
    const currentOffset = state.offset || manager.offset;
    const newOffset = currentOffset + diff;

    if (newOffset < 0 || newOffset > manager.maxOffset) {
      return;
    }
    manager.updateOffset(newOffset);
    updateState(newOffset);
  });
  const onWheelActive = useCallback(() => {
    setActive(true);
  }, []);
  const onWheelDisable = useCallback(() => {
    setActive(false);
  }, []);
  useLockScroll(active);

  return {
    ...state,
    manager: swipeManager.current,
    getItemStep,
    onStepsChange,
    onNext,
    onPrev,
    onGoTo,
    onItemNext,
    onItemPrev,
    onItemGoTo,
    onWheel,
    onWheelActive,
    onWheelDisable,
  };
}
