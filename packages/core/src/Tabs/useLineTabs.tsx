import { RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { useEventCallback } from '@muya-ui/utils';

import ImgPoolContext from '../Img/ImgPoolContext';
import { ITabsProps } from './types';
import useTabsBase from './useTabsBase';

interface IInnerState {
  width: number;
  left: number;
  transition: 'on' | 'off';
  selectedRect?: ClientRect;
  isMoving: boolean;
}

// 内部使用判断选中容器变化了
function rectChange(rect1: ClientRect, rect2: ClientRect) {
  return rect1.width !== rect2.width || rect1.left !== rect2.left;
}

export default function useLineTabs(props: ITabsProps, containerRef: RefObject<HTMLDivElement>) {
  const { lineIndicatorMode } = props;
  const showIndicator = lineIndicatorMode === 'static';
  const { children: resultChildren, items, selectedIndex } = useTabsBase(props, showIndicator);

  const [indicatorState, setIndicatorState] = useState<IInnerState>({
    width: 0,
    left: 0,
    transition: 'off',
    isMoving: false,
  });
  const lastItemIndex = useRef(-1);

  const updateIndicator = useCallback(
    (transition: 'on' | 'off' = 'on') => {
      if (!containerRef.current || !items.length) {
        return;
      }
      const selectedRef = items[selectedIndex].ref;
      // items 存在，则 selected 一定存在
      const selectedRect = selectedRef.current!.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setIndicatorState({
        width: selectedRect.width,
        left: selectedRect.left - containerRect.left,
        transition,
        selectedRect,
        isMoving: transition === 'on',
      });
    },
    [containerRef, items, selectedIndex],
  );

  const imgPool = useContext(ImgPoolContext);
  const resizeCheck = async () => updateIndicator('off');

  useEffect(() => {
    const innerLastItemIndex = lastItemIndex.current;
    if (innerLastItemIndex !== selectedIndex) {
      lastItemIndex.current = selectedIndex;
      // -1 时为第一次，不需要动画
      updateIndicator(innerLastItemIndex === -1 ? 'off' : 'on');
    } else if (items[selectedIndex]) {
      const selectedRef = items[selectedIndex].ref;
      // 如果重新渲染了，且selectedIndex 没变，检查一下选中的项的 BoundingClientRect 有没有变
      if (selectedRef && selectedRef.current) {
        const selectedRect = selectedRef.current.getBoundingClientRect();
        if (indicatorState.selectedRect && rectChange(indicatorState.selectedRect, selectedRect)) {
          updateIndicator('off');
        }
      }
    }

    imgPool.resizeCheckFns.add(resizeCheck);
    return () => {
      imgPool.resizeCheckFns.delete(resizeCheck);
    };
  });

  const updateIndicatorWithOffset = useCallback(
    (offset: number, transition: 'on' | 'off') => {
      const newLeft = indicatorState.left - offset;
      const containerRect = containerRef.current!.getBoundingClientRect();
      if (newLeft <= 0) {
        setIndicatorState({
          ...indicatorState,
          left: 0,
          width: 0,
          transition,
        });
      } else if (newLeft > containerRect.width) {
        setIndicatorState({
          ...indicatorState,
          left: containerRect.width,
          width: 0,
          transition,
        });
      } else {
        updateIndicator(transition);
      }
    },
    [containerRef, indicatorState, updateIndicator],
  );

  const onContainerChange = useEventCallback((offset?: number) => {
    if (offset !== undefined) {
      updateIndicatorWithOffset(offset, 'off');
    } else {
      updateIndicator('off');
    }
  });

  return {
    children: resultChildren,
    indicatorState,
    hideContainerIndicator: showIndicator,
    onContainerChange,
    updateIndicator,
    updateIndicatorWithOffset,
    resizeCheck,
  };
}
