import styled, { css } from 'styled-components';

import { IThemedBaseProps } from '../types';
import { withThemeForStyled } from '../utils/withTheme';

export interface ILineIndicatorProps {
  $width?: number;
  $left?: number;
  $transition?: 'on' | 'off';
  /**
   * 隐藏指示器
   */
  $hide?: boolean;
}

function tabIndicatorCss(props: ILineIndicatorProps & IThemedBaseProps) {
  const { theme, $left = 0, $width = 0, $transition = 'off', $hide = false } = props;
  const { Tabs: token } = theme.components;
  const { indicator } = token;
  const {
    pattern: { duration, easing },
  } = theme.transition;
  let transitionCss;
  if ($transition === 'on') {
    transitionCss = css`
      transition: all ${duration.status}ms ${easing.status};
    `;
  }
  let indicatorCss;
  if (!$hide) {
    indicatorCss = css`
      z-index: 2;
      &::before {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        height: ${indicator.activeHeight}px;
        background: ${indicator.activeColor};
        width: ${$width}px;
        left: ${$left}px;
        ${transitionCss}
      }
    `;
  }
  return css`
    height: ${indicator.bgHeight}px;
    background: ${indicator.bgColor};
    ${indicatorCss}
  `;
}
const LineIndicator = styled.div<ILineIndicatorProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  ${tabIndicatorCss}
`;

export default withThemeForStyled(LineIndicator);
