import { useEffect, useRef } from 'react';

import { useEventCallback } from '@muya-ui/utils';

import { ISwipeManager, useSwipe } from '../Swipe';
import { ITabsContainerProps } from './types';

export default function useTabsContainer(props: Pick<ITabsContainerProps, 'onChange'>) {
  const { onChange } = props;
  const { onPrev, onNext, onStepsChange, hasNext, hasPrev, stepIndex, manager } = useSwipe();
  const containerOffset = useRef(0);
  const updateContainerOffset = () => {
    if (manager) {
      containerOffset.current = manager.offset;
    }
  };
  const btnPrev = useEventCallback(() => {
    updateContainerOffset();
    onPrev();
  });
  const btnNext = useEventCallback(() => {
    updateContainerOffset();
    onNext();
  });

  const innerOnStepsChange = (manager: ISwipeManager) => {
    onStepsChange(manager);
    updateContainerOffset();
    onChange && onChange();
  };
  const onTransitionEnd = () => {
    updateContainerOffset();
    onChange && onChange();
  };
  useEffect(() => {
    if (manager) {
      const newOffset = manager.offset;
      if (newOffset !== containerOffset.current) {
        onChange && onChange(newOffset - containerOffset.current);
        containerOffset.current = newOffset;
      }
    }
  });
  return {
    onStepsChange: innerOnStepsChange,
    onPrev: btnPrev,
    onNext: btnNext,
    hasNext,
    hasPrev,
    stepIndex,
    onTransitionEnd,
  };
}
