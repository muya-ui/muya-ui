import React, { useCallback, useMemo, useState } from 'react';

import { useAfterEffect, useEventCallback } from '@muya-ui/utils';

import { ICarouselProps } from './types';
import useMoveActive from './useMoveActive';
import { transformImgs } from './utils';

export default function useSwipeCarousel(props: ICarouselProps) {
  const {
    imgs,
    defaultIndex = 0,
    duration,
    autoplay = 0,
    arrow = 'always',
    arrowEnabled = 'always',
    arrowSize = 'm',
    indicator = 'center',
    indicatorTrigger,
    onChange,
    lazy,
    animation,
    styles,
    indicatorStyles,
    enableDiffChildren,

    children,
    onMouseEnter,
    onMouseLeave,
    ...otherProps
  } = props;

  const { imgs: innerImgs, isItems, imgItems } = useMemo(() => {
    return transformImgs(imgs);
  }, [imgs]);

  const { shouldActive, setMoveActive, moveActive } = useMoveActive(arrowEnabled === 'always');
  // const onIndexChange = useMemo(() => shouldActive(onGoTo), [onGoTo, shouldActive]);
  const [currentIndex, setCurrent] = useState(defaultIndex);
  const canSwipe = innerImgs.length > 1;
  const imgLength = innerImgs.length;
  const updateIndex = useCallback(
    (index: number) => {
      setCurrent(index);
      if (onChange) {
        onChange(innerImgs[index], index);
      }
    },
    [innerImgs, onChange],
  );
  const handlePrev = useMemo(() => {
    return shouldActive(() => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) {
        newIndex = imgLength - 1;
      }
      updateIndex(newIndex);
    });
  }, [currentIndex, imgLength, shouldActive, updateIndex]);
  const handleNext = useMemo(() => {
    return shouldActive(() => {
      let newIndex = currentIndex + 1;
      if (newIndex > imgLength - 1) {
        newIndex = 0;
      }
      updateIndex(newIndex);
    });
  }, [currentIndex, imgLength, shouldActive, updateIndex]);
  const handleGoTo = useMemo(() => {
    return shouldActive((index: number) => {
      if (index >= 0 && index < imgLength) {
        updateIndex(index);
      }
    });
  }, [imgLength, shouldActive, updateIndex]);

  const { onActive, onDisable, active: autoplayActive } = useAfterEffect(
    handleNext,
    autoplay * 1000,
  );

  const handleMouseEnter = useEventCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onDisable();
    onMouseEnter && onMouseEnter(e);
  }, []);
  const handleMouseLeave = useEventCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onActive();
    onMouseLeave && onMouseLeave(e);
  }, []);
  const handleTransitionEnd = useEventCallback(() => setMoveActive(true));

  return {
    canSwipe,
    isItems,
    imgItems,
    innerImgs,
    currentIndex,
    imgLength,
    autoplayActive,
    moveActive,

    // 处理函数
    handlePrev,
    handleNext,
    handleGoTo,
    handleMouseEnter,
    handleMouseLeave,
    handleTransitionEnd,

    // 直接往下传
    arrowSize,
    arrow,
    enableDiffChildren,
    lazy,
    duration,
    indicatorTrigger,
    indicator,
    children,

    otherProps,
    styles,
    indicatorStyles,
  };
}
