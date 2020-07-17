import { CSSProperties } from 'react';
import { TransitionStatus } from 'react-transition-group/Transition';

import { IAnimationBaseParams } from './types';
import { withAnimation } from './withAnimation';
import reflow from '../utils/reflow';

function getScale(value: number) {
  return `scale(${value}, ${value ** 2})`;
}

const beforeEnter = (node: HTMLElement, props: IAnimationBaseParams) => {
  const {
    theme: {
      transition: { pattern: transitionPattern },
    },
    timeout,
    easing,
  } = props;
  reflow(node);
  node.style.transition = `all ${timeout}ms ${easing || transitionPattern.easing.enter}`;
  node.style.webkitTransition = `all ${timeout}ms ${easing || transitionPattern.easing.enter}`;
};

const beforeExit = (node: HTMLElement, props: IAnimationBaseParams) => {
  const {
    theme: {
      transition: { pattern: transitionPattern },
    },
    timeout,
    easing,
  } = props;
  node.style.opacity = '0';
  node.style.transform = getScale(0.75);
  node.style.webkitTransform = getScale(0.75);
  node.style.transition = `all ${timeout}ms ${easing || transitionPattern.easing.leave}`;
  node.style.webkitTransition = `all ${timeout}ms ${easing || transitionPattern.easing.leave}`;
};

function makeStyles(state: TransitionStatus): CSSProperties {
  const defaultStyle: CSSProperties = {
    opacity: 0,
    transform: getScale(0.75),
  };

  const transitionStyles: Partial<Record<TransitionStatus, CSSProperties>> = {
    entering: {
      opacity: 1,
      transform: getScale(1),
    },
    entered: {
      opacity: 1,
      transform: 'none',
    },
    exited: {
      visibility: 'hidden',
    },
  };
  return {
    ...defaultStyle,
    ...transitionStyles[state],
  };
}

export default withAnimation(makeStyles, {
  beforeEnter,
  beforeExit,
});
