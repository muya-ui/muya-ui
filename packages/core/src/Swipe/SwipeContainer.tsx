import React from 'react';
import styled, { css } from 'styled-components';

import { ISwipeDirection } from './types';

interface IStyledContainerProps {
  $direction: ISwipeDirection;
}

const StyledContainerInner = styled.div<IStyledContainerProps>`
  position: relative;
  ${props => {
    const { $direction } = props;
    if ($direction === 'horizontal') {
      return css`
        overflow-x: hidden;
      `;
    }
    return css`
      overflow-y: hidden;
    `;
  }}
`;

export default React.memo(StyledContainerInner);
