import { css } from 'styled-components';

import { makeEllipsisStyle } from '../styled/mixins/ellipsis';
import { ITypographyBaseProps } from './types';
import { ITheme } from '@muya-ui/theme-light';

export const baseStyle = css`
  box-sizing: border-box;
  margin: 0;
  text-decoration: ${(props: ITypographyBaseProps) => props.delete && 'line-through'};
  text-decoration: ${(props: ITypographyBaseProps) => props.underline && 'underline'};
  ${(props: ITypographyBaseProps) => makeEllipsisStyle(props.ellipsis)};
`;

export const getFontStyle = (props: ITypographyBaseProps, theme: ITheme) => {
  const { lineHeight: lineHeightProp, fontSize: fontSizeProp } = props;

  const {
    typography,
    components: { Typography: token },
  } = theme;
  let fontSize;
  let lineHeight;

  if (typeof fontSizeProp === 'number') {
    fontSize = `${fontSizeProp}px`;
  } else {
    fontSize = `${typography.spec.fontSize[fontSizeProp || token.defaultFontLevel]}px`;
  }

  if (lineHeightProp) {
    lineHeight = lineHeightProp;
  } else if (typeof fontSizeProp === 'number') {
    lineHeight = typography.spec.global.lineHeight;
  } else {
    lineHeight = `${typography.spec.lineHeight[fontSizeProp || token.defaultFontLevel]}px`;
  }

  return {
    fontSize,
    lineHeight,
  };
};
