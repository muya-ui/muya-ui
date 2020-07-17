import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { useEffectOnce } from '@muya-ui/utils';
import {
  ClearIcon,
  InformIcon,
  ReloadIcon,
  ReminderIcon,
  SuccessIcon,
} from '@muya-ui/theme-light';

import Spin from '../Spin';
import { IThemedBaseProps } from '../types';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { withThemeForStyled } from '../utils/withTheme';
import { IToastItemProps } from './types';

const StyledToastItem = styled.div`
  ${(props: IThemedBaseProps) => {
    const { theme } = props;
    const { colors, size } = theme;
    const { itemMarginBottom, shadow } = theme.components.Notification.toast;
    return css`
      display: flex;
      background: ${colors.pattern.background.higher};
      box-shadow: ${shadow};
      border-radius: ${size.spec.borderRadius.s2};
      pointer-events: all;
      margin-bottom: ${itemMarginBottom}px;
    `;
  }}
`;

const StyledContent = styled.div`
  ${(props: IThemedBaseProps) => {
    const { theme } = props;
    const { colors } = theme;
    const { contentStyle } = theme.components.Notification.toast;
    return css`
      box-sizing: border-box;
      color: ${colors.pattern.text.text};
      padding: ${contentStyle.padding};
      max-width: ${contentStyle.maxWidth}px;
      min-width: ${contentStyle.minWidth}px;
      line-height: ${contentStyle.lineHeight}px;
      font-size: ${contentStyle.fontSize}px;
    `;
  }}
`;

const StyledIcon = styled.div`
  box-sizing: border-box;
  ${(props: IThemedBaseProps) => {
    const { theme } = props;
    const { iconStyle } = theme.components.Notification.toast;
    return css`
      padding: ${iconStyle.padding};
      font-size: ${iconStyle.size}px;
      line-height: ${iconStyle.size}px;
      width: ${iconStyle.width}px;
    `;
  }}
`;

const BaseNode = styled.div``;
const ToastItemWithoutStyle = memoForwardRef<HTMLDivElement, IToastItemProps>((props, ref) => {
  const { item, timeout, state, className, style = {}, ...otherProps } = props;
  const theme = useTheme();
  const innerStyles = useStyles(
    'toast-item',
    {
      self: '',
      container: '',
      icon: '',
      content: '',
    },
    item.styles,
  );
  let iconNode: ReactNode;
  if (item.icon) {
    iconNode = item.icon;
  } else if (item.type !== 'loading') {
    const { Notification: token } = theme.components;
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
  } else {
    iconNode = (
      <StyledIcon {...innerStyles.icon} theme={theme}>
        <Spin />
      </StyledIcon>
    );
  }
  let contentNode: ReactNode;
  if (typeof item.content === 'string' || item.enableContentWrapper) {
    contentNode = (
      <StyledContent {...innerStyles.content} theme={theme}>
        {item.content}
      </StyledContent>
    );
  } else {
    contentNode = item.content;
  }
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
    <BaseNode ref={ref} {...containerProps}>
      <StyledToastItem theme={theme} {...innerStyles.container}>
        {iconNode}
        {contentNode}
      </StyledToastItem>
    </BaseNode>
  );
});

const ToastItem = styled(ToastItemWithoutStyle)<IToastItemProps>`
  ${props => {
    const { theme, item, state, timeout } = props;
    const { colors, transition } = theme;
    const { lineMaxChar, contentStyle, minHeight } = theme.components.Notification.toast;
    let maxHeight = item.maxHeight || minHeight;
    if (typeof item.content === 'string' && item.content.length > lineMaxChar) {
      const lineNum = Math.ceil(item.content.length / lineMaxChar);
      maxHeight = minHeight + lineNum * contentStyle.lineHeight;
    }
    const transitionMap = {
      entering: '',
      entered: css`
        max-height: ${maxHeight}px;
        opacity: 1;
      `,
      exiting: css`
        max-height: 0;
        opacity: 0;
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
      `;
    return css`
      transition: all ${timeout}ms ${transition.pattern.easing.enter};
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      ${transformCSS}

      & ${StyledIcon} {
        color: ${colors.pattern.feature[item.type!]};
      }
    `;
  }}
`;

export default withThemeForStyled(ToastItem);
