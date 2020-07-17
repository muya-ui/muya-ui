import React, { useMemo, useRef } from 'react';

import { useForkRef } from '@muya-ui/utils';

import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import SwipeContainer from './SwipeContainer';
import SwipePanel from './SwipePanel';
import { ISwipeProps } from './types';
import useInnerSwipe from './useInnerSwipe';

const defaultStyles = {
  panel: '',
};

const Swipe = memoForwardRef<HTMLDivElement, ISwipeProps>((props, ref) => {
  const {
    direction = 'horizontal',
    stepIndex,
    itemIndex,
    equalNum,
    gutter,
    offset,
    duration,
    onStepsChange,
    children,
    onTransitionEnd,
    styles,
    defaultIndex,
    enableDiffChildren,
    transitionStatus: propsTransitionStatus,
    ...otherProps
  } = props;
  const innerStyles = useStyles('swipe', defaultStyles, styles);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useForkRef<HTMLDivElement>(containerRef, ref);
  const { nodes, panelStyle, transitionStatus, finalDuration } = useInnerSwipe(props, containerRef);

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
        onTransitionEnd={onTransitionEnd}
        style={innerPanelStyle}
        $direction={direction}
      >
        {nodes}
      </SwipePanel>
    </SwipeContainer>
  );
});

export default Swipe;
