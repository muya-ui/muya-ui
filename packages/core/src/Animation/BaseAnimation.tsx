import React, { Ref, useCallback, useMemo } from 'react';
import Transition from 'react-transition-group/Transition';

import { useForkRef } from '@muya-ui/utils';

import memoForwardRef from '../utils/memoForwardRef';
import useTheme from '../utils/useTheme';
import { IAnimationBaseProps } from './types';

const BaseAnimation = memoForwardRef((props: IAnimationBaseProps, ref: Ref<unknown>) => {
  const { children, makeStyles, timeout, easing, style, beforeEnter, beforeExit, ...other } = props;
  const theme = useTheme();
  const timeoutWithDefault = timeout || theme.transition.spec.duration.normal;
  const handleRef = useForkRef(children.ref, ref);
  const makeStyleProps = useMemo(() => ({ theme, style, easing, timeout: timeoutWithDefault }), [
    easing,
    style,
    theme,
    timeoutWithDefault,
  ]);
  const onEnter = useCallback(
    (node: HTMLElement, isAppearing: boolean) => {
      if (beforeEnter) {
        beforeEnter(node, makeStyleProps);
      }
      if (props.onEnter) {
        props.onEnter(node, isAppearing);
      }
    },
    [beforeEnter, makeStyleProps, props],
  );
  const onExit = useCallback(
    (node: HTMLElement) => {
      if (beforeExit) {
        beforeExit(node, makeStyleProps);
      }
      if (props.onExit) {
        props.onExit(node);
      }
    },
    [beforeExit, makeStyleProps, props],
  );
  return (
    <Transition
      appear
      {...other}
      style={style}
      timeout={timeoutWithDefault}
      onEnter={onEnter}
      onExit={onExit}
    >
      {state =>
        React.cloneElement(children, {
          ...children.props,
          style: {
            ...makeStyles!(state, makeStyleProps),
            ...children.props.style,
          },
          ref: handleRef,
        })
      }
    </Transition>
  );
});

export default BaseAnimation;
