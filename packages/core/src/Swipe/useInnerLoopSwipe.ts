import { CSSProperties, RefObject, useEffect, useMemo, useRef } from 'react';

import { useDebounce, useForceUpdate } from '@muya-ui/utils';
import generateLoopSwipeManager, {
  generateDisabledLoopSwipeManager,
} from './generateLoopSwipeManager';
import { ILoopSwipeManager, ILoopSwipeProps } from './types';
import useBaseSwipe from './useBaseSwipe';

export default function useInnerLoopSwipe(
  props: ILoopSwipeProps,
  containerRef: RefObject<HTMLDivElement>,
) {
  const {
    direction = 'horizontal',
    stepIndex = -1,
    itemIndex = -1,
    equalNum,
    onStepsChange,
    gutter,
    defaultIndex = 0,
    children,
    transitionStatus,
  } = props;
  const swipeManager = useRef<ILoopSwipeManager>();
  const isH = direction === 'horizontal';
  const innerGutter = gutter || 0;
  const forceUpdate = useForceUpdate();
  const isForceUpdate = useRef(false);

  const forceRefreshSwipe = () => {
    isForceUpdate.current = true;
    forceUpdate();
  };
  const endRectChange = () => {
    if (onStepsChange && swipeManager.current) {
      onStepsChange(swipeManager.current);
    }
    forceRefreshSwipe();
  };
  const handleRectChange = (
    itemRects: ClientRect[],
    containerRect: ClientRect,
    cloneItemRects: ClientRect[],
  ) => {
    // 如果没有 clone 的项，表面当前的面板是无法进行循环的
    // 不需要做任何处理
    if (cloneItemRects.length <= 0) {
      swipeManager.current = generateDisabledLoopSwipeManager();
      endRectChange();
      return;
    }
    const containerSize = isH ? containerRect.width : containerRect.height;
    swipeManager.current = generateLoopSwipeManager({
      items: itemRects,
      cloneItemRects,
      containerSize,
      direction,
      gutter: innerGutter,
      stepIndex,
      itemIndex,
      defaultIndex,
    });
    endRectChange();
  };

  const { nodes, finalDuration } = useBaseSwipe({
    loop: true,
    children,
    direction,
    equalNum,
    gutter,
    containerRef,
    onRectChange: handleRectChange,
  });

  let innerOffset = 0;
  let innerTransitionStatus = transitionStatus || 'on';
  if (swipeManager.current && itemIndex >= 0) {
    innerOffset = swipeManager.current.getItemOffset(itemIndex);
  } else if (swipeManager.current && stepIndex >= 0) {
    innerOffset = swipeManager.current.getStepOffset(stepIndex);
  }
  // 如果移到了临界点，需要解除锁定，并forceUpdate
  const resetPosition = () => {
    if (!swipeManager.current) {
      return;
    }
    if (swipeManager.current.locked) {
      swipeManager.current.unlock();
      forceRefreshSwipe();
    }
  };
  if (isForceUpdate.current) {
    innerTransitionStatus = 'off';
  }

  const [debounceResetPosition] = useDebounce(resetPosition, finalDuration);
  useEffect(() => {
    debounceResetPosition();
  });
  isForceUpdate.current = false;
  const position = isH ? `${-innerOffset}px, 0` : `0, ${-innerOffset}px`;
  const panelStyle: CSSProperties = useMemo(
    () => ({
      transform: `translate(${position})`,
    }),
    [position],
  );
  return {
    finalDuration,
    manager: swipeManager,
    panelStyle,
    nodes,
    transitionStatus: innerTransitionStatus,

    // 只是为了测试而返回的一些操作
    handleRectChange,
    swipeManager,
    resetPosition,
  };
}
