import React, { useMemo, useRef } from 'react';

import { useForkRef } from '@muya-ui/utils';

import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import SwipeContainer from './SwipeContainer';
import SwipePanel from './SwipePanel';
import { ILoopSwipeProps } from './types';
import useInnerLoopSwipe from './useInnerLoopSwipe';

const defaultStyles = {
  panel: '',
};

const Swipe = memoForwardRef<HTMLDivElement, ILoopSwipeProps>((props, ref) => {
  const {
    direction = 'horizontal',
    stepIndex,
    itemIndex,
    equalNum,
    gutter,
    duration,
    onStepsChange,
    children,
    styles,
    defaultIndex,
    enableDiffChildren,
    onTransitionEnd,
    transitionStatus: propsTransitionStatus,
    ...otherProps
  } = props;
  const innerStyles = useStyles('swipe', defaultStyles, styles);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useForkRef<HTMLDivElement>(containerRef, ref);
  const { nodes: resultChildren, panelStyle, transitionStatus, finalDuration } = useInnerLoopSwipe(
    props,
    containerRef,
  );

  const innerPanelStyle = useMemo(() => {
    if (innerStyles.panel.style) {
      return {
        ...innerStyles.panel.style,
        ...panelStyle,
      };
    }

    return panelStyle;
  }, [innerStyles.panel.style, panelStyle]);

  return (
    <SwipeContainer $direction={direction} {...otherProps} ref={handleRef}>
      <SwipePanel
        className={innerStyles.panel.className}
        $duration={finalDuration}
        $transition={propsTransitionStatus || transitionStatus}
        style={innerPanelStyle}
        $direction={direction}
        onTransitionEnd={onTransitionEnd}
      >
        {resultChildren}
      </SwipePanel>
    </SwipeContainer>
  );
});

export default Swipe;
