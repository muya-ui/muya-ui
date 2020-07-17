import styled, { css } from 'styled-components';

import { StyledCheckboxLabel } from '../Checkbox/styled';
import { IButtonPureProps } from './types';

const baseCSS = css`
  /* 相对定位 */
  position: relative;

  /* flex + inline */
  display: inline-flex;

  /* 内部元素水平&垂直居中 */
  align-items: center;
  justify-content: center;
  vertical-align: middle;
`;

export const StyledButton = styled.button`
  /* 样式重置部分 */
  outline: 0;
  margin: 0;
  font-family: inherit;
  text-transform: none;
  overflow: visible;
  box-sizing: border-box;
  ${baseCSS}
`;

export const StyledLink = styled.a`
  text-decoration: none;
  ${baseCSS}
`;

export const StyledSide = styled.span<IButtonPureProps>`
  display: inline-flex;
  ${props => {
    const { prefixNode, theme, suffixNode } = props;
    const { Button: btnToken } = theme.components;
    if (prefixNode) {
      return css`
        padding-right: ${btnToken.sidePadding}px;
      `;
    } else if (suffixNode) {
      return css`
        padding-left: ${btnToken.sidePadding}px;
      `;
    }
  }}

  ${StyledCheckboxLabel} {
    line-height: unset;
  }
`;
