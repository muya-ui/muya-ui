import React, { useRef } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import styled, { css } from 'styled-components';

import { useForkRef } from '@muya-ui/utils';

import Portal from '../Portal';
import { withThemeForStyled } from '../utils/withTheme';
import { INotificationListProps } from './types';
import useExpireQueue from './useNotificationList';

const BaseNode = styled.div``;

const NotificationListWithoutStyle = React.forwardRef<HTMLDivElement, INotificationListProps>(
  (props, ref) => {
    const {
      onMouseEnter,
      onMouseLeave,
      position,
      expireQueue,
      hoverStop,
      fullScreen,
      children,
      container,
      ...otherProps
    } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const handleRef = useForkRef<HTMLDivElement>(containerRef, ref);
    const { items, handleMouseEnter, handleMouseLeave } = useExpireQueue(
      {
        onMouseEnter,
        onMouseLeave,
        position,
        expireQueue,
        hoverStop,
        fullScreen,
      },
      containerRef,
    );
    const poolTimeout = expireQueue.setting.timeout;

    return (
      <Portal container={container}>
        <BaseNode
          ref={handleRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...otherProps}
        >
          <TransitionGroup>
            {items.map(item => (
              <Transition
                key={item.id}
                timeout={{
                  enter: 10,
                  exit: poolTimeout,
                }}
              >
                {state => children(state, item)}
              </Transition>
            ))}
          </TransitionGroup>
        </BaseNode>
      </Portal>
    );
  },
);

const NotificationList = styled(NotificationListWithoutStyle)<INotificationListProps>`
  ${props => {
    const { theme, position } = props;
    const { containerCenterTop, containerTop, containerBottom } = theme.components.Notification;

    let positionCss;
    if (position === 'top-center') {
      positionCss = css`
        top: ${containerCenterTop}px;
        width: 100%;
        flex-direction: column;
      `;
    } else if (position === 'top-left') {
      positionCss = css`
        top: ${containerTop}px;
        left: ${containerTop}px;
        flex-direction: column;
      `;
    } else if (position === 'top-right') {
      positionCss = css`
        top: ${containerTop}px;
        right: ${containerTop}px;
        flex-direction: column;
      `;
    } else if (position === 'bottom-left') {
      positionCss = css`
        bottom: ${containerBottom}px;
        left: ${containerTop}px;
        flex-direction: column-reverse;
      `;
    } else if (position === 'bottom-right') {
      positionCss = css`
        bottom: ${containerBottom}px;
        right: ${containerTop}px;
        flex-direction: column-reverse;
      `;
    }
    return css`
      position: fixed;
      pointer-events: none;
      z-index: ${theme.zIndex.pattern.toast};

      ${positionCss}
    `;
  }}
`;

export default withThemeForStyled(NotificationList);
