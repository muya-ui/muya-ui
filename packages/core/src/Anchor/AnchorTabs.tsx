import React from 'react';
import memoForwardRef from '../utils/memoForwardRef';
import { IAnchorTabsProps } from './types';
import { useAnchorContext } from './context';
import Tabs from '../Tabs';
import styled, { css } from 'styled-components';
import useTheme from '../utils/useTheme';

interface LineIndicatorProps {
  $height: number;
  $top: number;
}
const LineIndicator = styled.div<LineIndicatorProps>`
  ${props => {
    const { theme, $height, $top } = props;
    const { Tabs: token } = theme.components;
    const { indicator } = token;
    const {
      pattern: { duration, easing },
    } = theme.transition;
    return css`
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      height: 100%;
      width: ${indicator.bgHeight}px;
      background: ${indicator.bgColor};
      z-index: 2;
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        width: ${indicator.activeHeight}px;
        top: ${$top}px;
        height: ${$height}px;
        background: ${indicator.activeColor};
        transition: all ${duration.status}ms ${easing.status};
      }
    `;
  }}
`;

const StyledVerticalTabs = styled.div`
  position: relative;
`;

export default memoForwardRef<HTMLDivElement, IAnchorTabsProps>((props, ref) => {
  const { activeLink, direction, indicatorHeight, indicatorTop } = useAnchorContext();
  const theme = useTheme();
  const { id, style, className, children } = props;
  if (direction === 'vertical') {
    return (
      <StyledVerticalTabs theme={theme} ref={ref} style={style} className={className} id={id}>
        {children}
        <LineIndicator $top={indicatorTop} $height={indicatorHeight} theme={theme} />
      </StyledVerticalTabs>
    );
  }

  return <Tabs ref={ref} index={activeLink || ''} {...props} />;
});
