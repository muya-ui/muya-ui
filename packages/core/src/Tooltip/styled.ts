import styled, { css } from 'styled-components';

import { IComponentSizeSpec } from '@muya-ui/theme-light';

import { IThemedBaseProps } from '../types';

export interface IStyledTooltipWrapperProps extends IThemedBaseProps {
  $size: IComponentSizeSpec;
}

export function makeTooltipWrapperStyle(props: IStyledTooltipWrapperProps) {
  const { $size, theme } = props;
  const { fontSize, lineHeight } = theme.typography.spec;
  const { color, fontLevel, padding, maxWidth, boxShadow, borderRadius } = theme.components.Tooltip;
  const level = fontLevel[$size];
  return css`
    color: ${color};
    font-size: ${fontSize[level]}px;
    line-height: ${lineHeight[level]}px;
    padding: ${padding[$size].map(p => `${p}px `)};
    border-radius: ${borderRadius};
    max-width: ${maxWidth}px;
    box-sizing: border-box;
    overflow: hidden;
    word-wrap: break-word;
    ${boxShadow && `box-shadow: ${boxShadow};`}
  `;
}

export const StyledTooltipWrapper = styled.div`
  ${makeTooltipWrapperStyle}
`;
