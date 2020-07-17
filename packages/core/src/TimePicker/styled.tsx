import React from 'react';
import styled, { css } from 'styled-components';

import CalendarFooter from '../Calendar/CalendarFooter';
import Input from '../Input';
import { StyledNodeWrapper } from '../Input/styled';

export const StyledFooter = styled(CalendarFooter)`
  ${props => {
    const token = props.theme.components.TimePicker;
    const { pattern } = props.theme.colors;
    return css`
      && {
        width: ${token.width}px;
        background-color: ${pattern.background.higher};
      }
    `;
  }}
`;

export const StyledInputInner = styled(Input)`
  ${props => {
    const token = props.theme.components.TimePicker;
    return css`
      && {
        width: ${token.width}px;
      }
    `;
  }}
  ${StyledNodeWrapper} {
    &:last-of-type {
      cursor: default;
      pointer-events: none;
    }
  }
`;

export const StyledInput = React.memo(StyledInputInner);
