import React, { ReactNode, useRef } from 'react';
import styled, { css } from 'styled-components';

import { useEffectOnce } from '@muya-ui/utils';
import {
  ClearIcon,
  CloseIcon as DefaultCloseIcon,
  InformIcon,
  ReloadIcon,
  ReminderIcon,
  SuccessIcon,
} from '@muya-ui/theme-light';

import IconButton from '../IconButton';
import Spin from '../Spin';
import Typography from '../Typography';
import { StyledTitle } from '../Typography/Title';
import forkHandler from '../utils/forkHandler';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { withThemeForStyled } from '../utils/withTheme';
import { INotificationItemProps } from './types';

const StyledItem = styled.div`
  ${props => {
    const { theme } = props;
    const { colors } = theme;
    const token = theme.components.Notification.notification;
    const { itemMarginBottom, borderRadius, width, minHeight, shadow } = token;
    return css`
      display: flex;
      background: ${colors.pattern.background.higher};
      box-shadow: ${shadow};
      border-radius: ${borderRadius};
      margin-bottom: ${itemMarginBottom}px;
      width: ${width}px;
      min-height: ${minHeight}px;
      pointer-events: all;
    `;
  }}
`;
const BaseNode = styled.div``;

const StyledContent = styled.div`
  ${props => {
    const { theme } = props;
    const token = theme.components.Notification.notification;
    const { contentStyle } = token;
    return css`
      width: 100%;
      position: relative;
      padding: ${contentStyle.plainPadding};
    `;
  }}
`;

const StyledIcon = styled.div`
  ${props => {
    const { theme } = props;
    const token = theme.components.Notification.notification;
    const { iconStyle } = token;
    return css`
      position: absolute;
      font-size: ${iconStyle.size}px;
      top: ${iconStyle.top}px;
      left: ${iconStyle.left}px;
    `;
  }}
`;

const StyledClose = styled(IconButton)``;

const NotificationItemWithoutStyle = memoForwardRef<HTMLDivElement, INotificationItemProps>(
  (props, ref) => {
    const {
      item,
      state,
      timeout,
      onClose,
      enterFrom,
      expireQueue,
      hoverStop,
      onMouseEnter,
      onMouseLeave,
      className,
      style = {},
      ...otherProps
    } = props;
    const theme = useTheme();
    const innerStyles = useStyles(
      'notification-item',
      {
        self: '',
        close: '',
        container: '',
        icon: '',
        title: '',
        content: '',
        contentWrapper: '',
      },
      item.styles,
    );
    const { Notification: token } = theme.components;
    let iconNode: ReactNode;
    if (item.icon) {
      iconNode = (
        <StyledIcon {...innerStyles.icon} theme={theme}>
          {item.icon}
        </StyledIcon>
      );
    } else if (item.type && item.type !== 'loading') {
      const tokenIcon = {
        info: InformIcon,
        error: ClearIcon,
        success: SuccessIcon,
        warning: ReminderIcon,
        loading: ReloadIcon,
        ...token.icon,
      };
      const Icon = tokenIcon[item.type];
      const bgColor = token.iconBgColor[item.type];
      iconNode = (
        <StyledIcon {...innerStyles.icon} theme={theme}>
          <Icon bgColor={bgColor} />
        </StyledIcon>
      );
    } else if (item.type && item.type === 'loading') {
      iconNode = (
        <StyledIcon {...innerStyles.icon} theme={theme}>
          <Spin />
        </StyledIcon>
      );
    }
    let titleNode: ReactNode;
    if (typeof item.title === 'string') {
      titleNode = (
        <Typography.Title {...innerStyles.title} level={token.notification.titleLevel} ellipsis>
          {item.title}
        </Typography.Title>
      );
    } else {
      titleNode = item.title;
    }
    let contentNode: ReactNode;
    if (typeof item.content === 'string') {
      contentNode = <Typography.Text {...innerStyles.content}>{item.content}</Typography.Text>;
    } else {
      contentNode = item.content;
    }
    const CloseIcon = token.notification.closeBtn || DefaultCloseIcon;
    const notFixed = useRef(!item.fixed);
    const handleMouseEnter = forkHandler(() => {
      if (hoverStop && notFixed.current) {
        expireQueue.fixedItem(item.id!);
      }
    }, onMouseEnter);
    const handleMouseLeave = forkHandler(() => {
      if (hoverStop && notFixed.current) {
        expireQueue.unFixedItem(item.id!);
        expireQueue.tick();
      }
    }, onMouseLeave);

    const containerProps = {
      style: {
        ...innerStyles.self.style,
        ...style,
      },
      className: [className, innerStyles.self.className].join(' '),
      ...otherProps,
    };

    useEffectOnce(() => () => {
      if (item.onClose) {
        item.onClose();
      }
    });

    return (
      <BaseNode
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref}
        {...containerProps}
      >
        <StyledItem {...innerStyles.container} theme={theme}>
          <StyledContent theme={theme} {...innerStyles.contentWrapper}>
            {iconNode}
            {titleNode}
            {contentNode}
            <StyledClose theme={theme} {...innerStyles.close} onClick={onClose}>
              <CloseIcon />
            </StyledClose>
          </StyledContent>
        </StyledItem>
      </BaseNode>
    );
  },
);

const NotificationItem = styled(NotificationItemWithoutStyle)<INotificationItemProps>`
  ${props => {
    const { theme, item, state, timeout, enterFrom = 'right' } = props;
    const { colors, transition } = theme;
    const { containerTop } = theme.components.Notification;
    const token = theme.components.Notification.notification;
    const { contentStyle, lineMaxChar } = token;
    let maxHeight = item.maxHeight || 120;
    const hasIcon = item.type || item.icon;
    if (typeof item.content === 'string' && item.content.length > 40) {
      const lineNum = Math.ceil(item.content.length / lineMaxChar);
      maxHeight = token.minHeight + lineNum * contentStyle.lineHeight;
    }
    let left = containerTop + token.width;
    left = enterFrom === 'right' ? left : -left;
    const transitionMap = {
      entering: '',
      entered: css`
        max-height: ${maxHeight}px;
        transform: translate(0, 0);
        transition-timing-function: ${transition.pattern.easing.enter};
        opacity: 1;
      `,
      exiting: css`
        max-height: 0;
        opacity: 0;
        transform: translate(0, 0);
        transition-timing-function: ${transition.pattern.easing.leave};
      `,
      exited: '',
      unmounted: '',
    };
    const transformCSS =
      transitionMap[state] ||
      css`
        max-height: 0;
        opacity: 0;
        transform: translate(0, 0);
      `;

    return css`
      transition: all ${timeout}ms ${token.easing};
      pointer-events: all;
      display: flex;
      align-items: center;
      justify-content: center;
      ${transformCSS}

      ${hasIcon &&
        css`
          & ${StyledContent} {
            padding: ${contentStyle.iconPadding};
          }
        `}

      & ${StyledTitle} {
        margin-bottom: ${token.titleMarginBottom}px;
      }

      & ${StyledIcon} {
        color: ${colors.pattern.feature[item.type || 'success']};
      }

      & ${StyledClose} {
        position: absolute;
        top: ${token.iconStyle.top}px;
        right: ${token.iconStyle.left}px;
      }
    `;
  }}
`;

export default withThemeForStyled(NotificationItem);
