import { RefObject, useMemo, useRef } from 'react';

import { useForceUpdate } from '@muya-ui/utils';
import generateSwipeManager, { generateDisabledSwipeManager } from './generateSwipeManager';
import { ISwipeManager, ISwipeProps } from './types';
import useBaseSwipe from './useBaseSwipe';
import { calculateSize } from './utils';

export default function useInnerSwipe(props: ISwipeProps, containerRef: RefObject<HTMLDivElement>) {
  const {
    defaultIndex,
    itemIndex = -1,
    direction = 'horizontal',
    stepIndex = -1,
    offset = -1,
    equalNum,
    gutter,
    onStepsChange,
    children,
    transitionStatus,
  } = props;
  const swipeManager = useRef<ISwipeManager>();
  const isH = direction === 'horizontal';
  const forceUpdate = useForceUpdate();
  const isForceUpdate = useRef(false);
  const endRectChange = () => {
    if (swipeManager.current && onStepsChange) {
      onStepsChange(swipeManager.current);
    }
    isForceUpdate.current = true;
    forceUpdate();
  };
  const handleRectChange = (itemRects: ClientRect[], containerRect: ClientRect) => {
    if (
      (equalNum && equalNum >= itemRects.length) ||
      // 当单个超出容器是有问题的，这种情况暂不处理
      itemRects.length <= 1
    ) {
      swipeManager.current = generateDisabledSwipeManager();
      endRectChange();
      return;
    }
    const panelSize = calculateSize(itemRects, isH);
    const containerSize = isH ? containerRect.width : containerRect.height;
    if (panelSize <= containerSize) {
      swipeManager.current = generateDisabledSwipeManager();
      endRectChange();
      return;
    }

    swipeManager.current = generateSwipeManager({
      items: itemRects,
      containerSize,
      direction,
      stepIndex,
      itemIndex,
      defaultIndex,
    });
    endRectChange();
  };
  const { nodes, finalDuration } = useBaseSwipe({
    children,
    direction,
    equalNum,
    gutter,
    onRectChange: handleRectChange,
    containerRef,
  });
  let finalOffset = 0;
  let innerTransitionStatus = transitionStatus || 'on';
  if (offset >= 0) {
    finalOffset = offset;
    innerTransitionStatus = transitionStatus || 'off';
  } else if (swipeManager.current && itemIndex >= 0) {
    finalOffset = swipeManager.current.getItemOffset(itemIndex);
  } else if (swipeManager.current && stepIndex >= 0) {
    finalOffset = swipeManager.current.getStepOffset(stepIndex);
  }

  if (isForceUpdate.current) {
    innerTransitionStatus = 'off';
  }
  const position = isH ? `${-finalOffset}px, 0` : `0, ${-finalOffset}px`;
  const translateCSS: React.CSSProperties = useMemo(
    () => ({
      transform: `translate(${position})`,
    }),
    [position],
  );
  isForceUpdate.current = false;
  return {
    finalDuration,
    panelStyle: translateCSS,
    nodes,
    transitionStatus: innerTransitionStatus,

    // 只是为了测试而返回的一些操作
    handleRectChange,
    finalOffset,
  };
}
