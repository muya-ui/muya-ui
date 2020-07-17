import React, { useContext, useMemo } from 'react';
import styled, { css } from 'styled-components';

import ImgPoolContext from '../Img/ImgPoolContext';
import forkHandler from '../utils/forkHandler';
import memoForwardRef from '../utils/memoForwardRef';
import useTheme from '../utils/useTheme';
import { ISwipeDirection } from './types';

interface ISwipePanelPureProps {
  $transition: 'on' | 'off';
  $duration: number;
  $direction: ISwipeDirection;
}
type ISwipePanelProps = ISwipePanelPureProps & React.HTMLAttributes<HTMLDivElement>;

const BaseNode = styled.div<ISwipePanelPureProps>`
  position: relative;
  ${props => {
    const { theme, $direction, $transition = 'on', $duration: propDuration } = props;
    const { easing } = theme.transition.spec;
    let panelCss;
    if ($direction === 'horizontal') {
      panelCss = css`
        display: flex;
        width: 100000px;
        height: 100%;
      `;
    }
    let transitionCss;
    if ($transition === 'on') {
      transitionCss = css`
        transition: transform ${propDuration}ms ${easing.easeInOut};
      `;
    }
    return css`
      ${transitionCss}
      ${panelCss}
    `;
  }}
`;

export default memoForwardRef<HTMLDivElement, ISwipePanelProps>((props, ref) => {
  const { onTransitionEnd, ...otherProps } = props;
  const theme = useTheme();

  const pool = useContext(ImgPoolContext);
  const handleTransitionEnd = useMemo(() => {
    return forkHandler(() => {
      pool.throttleCheck({ type: 'scroll' });
    }, onTransitionEnd);
  }, [onTransitionEnd, pool]);
  return <BaseNode theme={theme} {...otherProps} onTransitionEnd={handleTransitionEnd} ref={ref} />;
});
