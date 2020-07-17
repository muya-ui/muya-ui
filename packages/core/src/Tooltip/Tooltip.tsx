import React, { useMemo } from 'react';

import Trigger from '../Trigger';
import useTheme from '../utils/useTheme';
import { StyledTooltipWrapper } from './styled';
import { ITooltipProps } from './types';
import memoForwardRef from '../utils/memoForwardRef';

export default memoForwardRef<HTMLDivElement, ITooltipProps>((props, ref) => {
  const {
    style,
    className,
    placement = 'top',
    size = 's',
    title,
    arrowStyle,
    children,
    ...other
  } = props;

  const theme = useTheme();
  const { arrowSize, bgColor } = theme.components.Tooltip;

  if (!title) {
    return children;
  }

  const popup = useMemo(
    () => (
      <StyledTooltipWrapper
        style={{
          backgroundColor: bgColor,
          ...style,
        }}
        className={className}
        theme={theme}
        $size={size}
      >
        {title}
      </StyledTooltipWrapper>
    ),
    [bgColor, className, size, style, theme, title],
  );

  return (
    <Trigger
      ref={ref}
      popup={popup}
      placement={placement}
      arrowStyle={{
        color: bgColor,
        ...arrowSize[size],
        ...arrowStyle,
      }}
      {...other}
    >
      {children}
    </Trigger>
  );
});
