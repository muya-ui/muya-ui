import React from 'react';
import styled, { css } from 'styled-components';

import Input, { RangeInput } from '../Input';
import { StyledNodeWrapper } from '../Input/styled';

const lastInputNodeWrapperStyle = css`
  ${StyledNodeWrapper} {
    &:last-of-type {
      cursor: default;
      pointer-events: none;
    }
  }
`;

export const StyledRangeInputInner = styled(RangeInput)`
  & input {
    text-align: center;
  }

  ${lastInputNodeWrapperStyle}
`;
export const StyledRangeInput = React.memo(StyledRangeInputInner);

export const StyledInputInner = styled(Input)`
  ${lastInputNodeWrapperStyle}
`;

export const StyledInput = React.memo(StyledInputInner);
