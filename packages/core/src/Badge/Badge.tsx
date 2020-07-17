import React, { Ref, useRef, useMemo } from 'react';

import useAdjustMiniFont from '../utils/useAdjustMiniFont';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import {
  StyledBadge,
  StyledBadgeContainer,
  StyledBadgeInnerText,
  StyledIndependentBadge,
} from './styled';
import { IBadgeProps, IBadgeStyleKeys } from './types';
import { getDisplayText } from './utils';
import { ICustomStylePropMap } from '../types';
import memoForwardRef from '../utils/memoForwardRef';

const Badge = memoForwardRef((props: IBadgeProps, ref: Ref<HTMLSpanElement>) => {
  const {
    dot = false,
    isStroke = false,
    showZero = false,
    detached = false,
    value,
    color,
    size = 'm',
    max = 99,
    styles,
    children,
    ...rest
  } = props;
  const theme = useTheme();
  const {
    components: { Badge: token },
  } = theme;
  const fontSize = token.fontSize[size!];
  const textRef = useRef<HTMLSpanElement>(null);
  const defaultStyles = useMemo<ICustomStylePropMap<IBadgeStyleKeys>>(
    () => ({
      container: '',
      badge: '',
    }),
    [],
  );
  const innerStyles = useStyles('badge', defaultStyles, styles);
  const styledBadgeProps = useMemo(
    () => ({
      theme,
      $detached: detached,
      $isStroke: isStroke,
      $value: value,
      $showZero: showZero,
      $dot: dot,
      $size: size!,
      $color: color,
      $text: '',
    }),
    [color, detached, dot, isStroke, showZero, size, theme, value],
  );

  const innerText: React.ReactNode = useMemo(() => {
    if (dot) {
      return '';
    }
    const displayText = getDisplayText(value, max);
    // 12px 以下的字需要 transform 一下
    if (fontSize < 12) {
      return (
        <StyledBadgeInnerText ref={textRef} theme={theme}>
          {displayText}
        </StyledBadgeInnerText>
      );
    }
    return displayText;
  }, [dot, fontSize, max, theme, value]);

  useAdjustMiniFont(textRef, fontSize);

  const finalChildren = useMemo(
    () =>
      children ? (
        <StyledBadgeContainer {...innerStyles.container}>
          <StyledBadge ref={ref} {...styledBadgeProps} {...innerStyles.badge} {...rest}>
            {innerText}
          </StyledBadge>
          {children}
        </StyledBadgeContainer>
      ) : (
        <StyledIndependentBadge ref={ref} {...styledBadgeProps} {...innerStyles.badge} {...rest}>
          {innerText}
        </StyledIndependentBadge>
      ),
    [children, innerStyles.badge, innerStyles.container, innerText, ref, rest, styledBadgeProps],
  );

  return finalChildren;
});

export default Badge;
