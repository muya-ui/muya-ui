import React, { CSSProperties, Ref, RefObject, useRef } from 'react';
import Transition, { TransitionStatus } from 'react-transition-group/Transition';
import styled, { css } from 'styled-components';

import useTheme from '../utils/useTheme';
import { IAnimationBaseParams, ICollapseAnimationProps } from './types';
import memoForwardRef from '../utils/memoForwardRef';

const StyledCollapse = styled.div<ICollapseAnimationProps>`
  ${props => {
    return css`
      height: ${props.minHeight}px;
      overflow: hidden;
      > div {
        display: flex;
        > div {
          width: 100%;
        }
      }
    `;
  }}
`;

function makeStyles(
  state: TransitionStatus,
  props: IAnimationBaseParams,
  wrapperRef: RefObject<HTMLDivElement>,
  minHeight: number,
): CSSProperties {
  const {
    theme: {
      transition: { pattern: transitionPattern },
    },
    timeout,
    easing,
  } = props;
  const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : minHeight;
  const defaultStyle: CSSProperties = {
    height: `${minHeight}px`,
    transitionProperty: 'height',
    transitionTimingFunction: easing || transitionPattern.easing.status,
    transitionDuration: `${timeout}ms`,
  };
  const transitionStyles: Partial<Record<TransitionStatus, CSSProperties>> = {
    entering: {
      transitionTimingFunction: easing || transitionPattern.easing.enter,
      height: `${wrapperHeight}px`,
    },
    entered: {
      height: 'auto',
      overflow: 'visible',
    },
    exiting: {
      transitionTimingFunction: easing || transitionPattern.easing.leave,
    },
    exited: {
      // visibility: 'hidden',
    },
  };
  return {
    ...defaultStyle,
    ...transitionStyles[state],
  };
}

const Collapse = memoForwardRef((props: ICollapseAnimationProps, ref: Ref<HTMLDivElement>) => {
  const {
    children,
    timeout,
    easing,
    style,
    onEnter: onEnterProp,
    onExit: onExitProp,
    minHeight = 0,
    ...other
  } = props;
  const theme = useTheme();
  const timeoutWithDefault = timeout || theme.transition.spec.duration.normal;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onEnter = (node: HTMLElement) => {
    if (node && node.style) {
      node.style.height = `${minHeight}px`;
    }
    /* istanbul ignore else */
    if (onEnterProp) {
      onEnterProp(node, true);
    }
  };
  const onExit = (node: HTMLElement) => {
    const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : minHeight;
    if (node && node.style) {
      node.style.height = `${wrapperHeight}px`;
    }
    /* istanbul ignore else */
    if (onExitProp) {
      onExitProp(node);
    }
  };
  return (
    <Transition
      appear
      timeout={timeoutWithDefault}
      style={style}
      onEnter={onEnter}
      onExit={onExit}
      {...other}
    >
      {state => (
        <StyledCollapse
          className={state}
          ref={ref}
          minHeight={minHeight}
          style={makeStyles(
            state,
            { theme, style, timeout: timeoutWithDefault, easing },
            wrapperRef,
            minHeight,
          )}
        >
          <div ref={wrapperRef}>
            <div>{children}</div>
          </div>
        </StyledCollapse>
      )}
    </Transition>
  );
});

export default Collapse;
