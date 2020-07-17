import React from 'react';
import styled, { css } from 'styled-components';

import { ITypographyHeadingLevel } from '@muya-ui/theme-light';

import useTheme from '../utils/useTheme';
import { baseStyle } from './mixin';
import { ITypographyTitleProps } from './types';

export const StyledTitle = styled.div<ITypographyTitleProps>`
  ${props => {
    const {
      theme: {
        colors,
        typography,
        components: { Typography: token },
      },
      color,
      level,
    } = props;
    const fontLevel = token.titleFontLevelMap[`h${level}` as ITypographyHeadingLevel];
    return css`
      ${baseStyle}
      color: ${colors.pattern.text[color || token.defaultTitleType]};
      font-weight: ${typography.spec.fontWeight.semibold};
      font-size: ${typography.spec.fontSize[fontLevel]}px;
      line-height: ${typography.spec.lineHeight[fontLevel]}px;
      margin-bottom: ${token.titleMarginBottom};
      & + & {
        margin-top: ${token.titleMarginTop};
      }
    `;
  }}
`;

export default React.forwardRef<HTMLHeadElement, ITypographyTitleProps>((props, ref) => {
  const { level = 1 } = props;
  const asProp = `h${level}` as ITypographyHeadingLevel;
  const theme = useTheme();
  return (
    <StyledTitle
      theme={theme}
      as={asProp}
      {...props}
      level={level}
      ref={ref as React.RefObject<HTMLDivElement>}
    />
  );
});
