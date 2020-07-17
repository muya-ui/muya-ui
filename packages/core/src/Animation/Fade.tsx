import { CSSProperties } from 'react';
import { TransitionStatus } from 'react-transition-group/Transition';

import { IAnimationBaseParams } from './types';
import { withAnimation } from './withAnimation';
import reflow from '../utils/reflow';

function makeStyles(state: TransitionStatus, props: IAnimationBaseParams): CSSProperties {
  const {
    theme: {
      transition: { pattern: transitionPattern },
    },
    timeout,
    easing,
  } = props;
  const defaultStyle: CSSProperties = {
    opacity: 0,
    transitionProperty: 'opacity',
    transitionTimingFunction: easing || transitionPattern.easing.status,
    transitionDuration: `${timeout}ms`,
  };
  const transitionStyles: Partial<Record<TransitionStatus, CSSProperties>> = {
    entering: {
      transitionTimingFunction: easing || transitionPattern.easing.enter,
      opacity: 1,
    },
    entered: {
      opacity: 1,
    },
    exiting: {
      transitionTimingFunction: easing || transitionPattern.easing.leave,
      opacity: 0,
    },
    exited: {
      opacity: 0,
      visibility: 'hidden',
    },
  };
  return {
    ...defaultStyle,
    ...transitionStyles[state],
  };
}

const beforeEnter = (node: HTMLElement) => {
  reflow(node);
};

export default withAnimation(makeStyles, {
  beforeEnter,
});
