import React, { CSSProperties, Ref, useMemo } from 'react';
import Transition, { TransitionStatus } from 'react-transition-group/Transition';

import { useForkRef } from '@muya-ui/utils';

import reflow from '../utils/reflow';
import useTheme from '../utils/useTheme';
import { ISlideAnimationDirection, ISlideAnimationProps } from './types';

const Slide = React.forwardRef((props: ISlideAnimationProps, ref: Ref<unknown>) => {
  const { children, timeout, easing, direction = 'up', minScale = 0.8, ...other } = props;
  const theme = useTheme();
  const timeoutWithDefault = timeout || theme.transition.spec.duration.normal;
  const handleRef = useForkRef(children.ref, ref);
  const {
    transition: { pattern: transitionPattern },
  } = theme;
  const styleWithDirectionMap = useMemo(
    () => ({
      up: {
        default: {
          transformOrigin: '0% 0%',
          transform: `scaleY(${minScale})`,
        },
        entering: {
          transform: 'scaleY(1)',
        },
        exiting: {
          transform: `scaleY(${minScale})`,
        },
      },
      down: {
        default: {
          transformOrigin: '100% 100%',
          transform: `scaleY(${minScale})`,
        },
        entering: {
          transform: 'scaleY(1)',
        },
        exiting: {
          transform: `scaleY(${minScale})`,
        },
      },
      left: {
        default: {
          transformOrigin: '0% 0%',
          transform: `scaleX(${minScale})`,
        },
        entering: {
          transform: 'scaleX(1)',
        },
        exiting: {
          transform: `scaleX(${minScale})`,
        },
      },
      right: {
        default: {
          transformOrigin: '100% 0%',
          transform: `scaleX(${minScale})`,
        },
        entering: {
          transform: 'scaleX(1)',
        },
        exiting: {
          transform: `scaleX(${minScale})`,
        },
      },
    }),
    [minScale],
  );

  function makeStyles(state: TransitionStatus, direction: ISlideAnimationDirection): CSSProperties {
    const defaultStyle: CSSProperties = {
      opacity: 0,
      ...styleWithDirectionMap[direction].default,
    };
    const transitionStyles: Partial<Record<TransitionStatus, CSSProperties>> = {
      entering: {
        opacity: 1,
        ...styleWithDirectionMap[direction].entering,
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

  const onEnter = (node: HTMLElement, isAppearing: boolean) => {
    // 进入动画之前，重置当前direction对应的默认状态
    node.style.transition = 'none';
    node.style.webkitTransition = 'none';
    node.style.transform = styleWithDirectionMap[direction].default.transform;
    node.style.webkitTransform = styleWithDirectionMap[direction].default.transform;
    reflow(node);
    const innerEasing = easing || transitionPattern.easing.enter;
    // 设置transition
    node.style.transition = `opacity ${timeoutWithDefault}ms ${innerEasing}, transform ${timeoutWithDefault}ms ${innerEasing}`;
    node.style.webkitTransition = `opacity ${timeoutWithDefault}ms ${innerEasing}, transform ${timeoutWithDefault}ms ${innerEasing}`;
    if (props.onEnter) {
      props.onEnter(node, isAppearing);
    }
  };

  const onExit = (node: HTMLElement) => {
    node.style.opacity = '0';
    node.style.transform = styleWithDirectionMap[direction].exiting.transform;
    node.style.webkitTransform = styleWithDirectionMap[direction].exiting.transform;
    reflow(node);
    const innerEasing = easing || transitionPattern.easing.leave;
    node.style.transition = `opacity ${timeoutWithDefault}ms ${innerEasing},transform ${timeoutWithDefault}ms ${innerEasing}`;
    node.style.webkitTransition = `opacity ${timeoutWithDefault}ms ${innerEasing},transform ${timeoutWithDefault}ms ${innerEasing}`;
    if (props.onExit) {
      props.onExit(node);
    }
  };

  return (
    <Transition appear {...other} timeout={timeoutWithDefault} onEnter={onEnter} onExit={onExit}>
      {state =>
        React.cloneElement(children, {
          ...children.props,
          style: {
            ...makeStyles!(state, direction),
            ...children.props.style,
          },
          ref: handleRef,
        })
      }
    </Transition>
  );
});

export default Slide;
