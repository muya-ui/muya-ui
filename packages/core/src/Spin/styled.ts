import styled, { css } from 'styled-components';

import { ISpinProps } from './types';
import { Omit } from '../types';

type ISpinPropsWithoutChildren = Omit<ISpinProps, 'children'>;

export const StyledSpinContent = styled.span<ISpinPropsWithoutChildren>`
  display: inline-flex;
  flex-flow: ${props => props.direction || 'row'} nowrap;
  align-items: center;
`;

export const StyledIconWrapper = styled.span<ISpinPropsWithoutChildren>`
  ${props => {
    const { size, theme } = props;
    const token = theme.components.Spin.icon;
    if (size) {
      return css`
        font-size: ${token.fontSize[size!]}px;
        padding: ${token.padding[size!]};
      `;
    }
  }}
`;

export const StyledDescWrapper = styled.span<ISpinPropsWithoutChildren>`
  ${props => {
    const { size, theme } = props;
    const token = theme.components.Spin.desc;
    if (size) {
      return css`
        color: ${theme.colors.pattern.text.text};
        font-size: ${token.fontSize[size!]}px;
        padding-right: ${token.paddingRight[size!]}px;
      `;
    }
  }}
  ${props => {
    if (!props.cancelText) {
      return css`
        padding-right: 0;
      `;
    }
  }}
`;
