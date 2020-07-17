import styled, { css } from 'styled-components';

import { withThemeForStyled } from '../utils/withTheme';
import { baseStyle, getFontStyle } from './mixin';
import { ITypographyBaseProps } from './types';

const Text = styled.span<ITypographyBaseProps>`
  ${props => {
    const { ellipsis, type, strong, color, theme } = props;
    const {
      colors,
      typography,
      components: { Typography: token },
    } = theme;
    const { lineHeight, fontSize } = getFontStyle(props, theme);

    return css`
      ${ellipsis && 'display: inline-block'};
      color: ${type
        ? colors.pattern.feature[type]
        : colors.pattern.text[color || token.defaultTextType]};
      font-weight: ${strong && typography.spec.fontWeight.semibold};
      font-size: ${fontSize};
      line-height: ${lineHeight};
      ${baseStyle}
    `;
  }}
`;

export default withThemeForStyled(Text);
