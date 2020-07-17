import React from 'react';
import styled, { css, CSSObject, ThemedStyledProps } from 'styled-components';

import { ITheme } from '@muya-ui/theme-light';

import addPx from '../utils/addPx';
import { withThemeForStyled } from '../utils/withTheme';
import ButtonCore from './ButtonCore';
import { highlightNeutralColorButtonType, siblingCss } from './mixins';
import { IButtonNode, IInlineButtonProps } from './types';

const InlineButtonPure = React.forwardRef<IButtonNode, IInlineButtonProps>((props, ref) => {
  const { type, constant, ...otherProps } = props;

  return <ButtonCore ref={ref} {...otherProps} />;
});

function buttonCSS(props: ThemedStyledProps<IInlineButtonProps, ITheme>) {
  const {
    type = 'normal',
    size = 'm',
    theme,
    busy,
    disabled,
    fontWeight: innerFontWeight,
    constant,
    weakLevel,
    width,
    loading,
    disableSiblingMargin = false,
  } = props;
  const btnToken = theme.components.Button;
  const { fontSize, typeColor, weakLevels, inlineButtonTypeColor } = btnToken;
  const fontWeight = innerFontWeight === 'lighter' ? btnToken.fineFontWeight : btnToken.fontWeight;
  let colorToken = inlineButtonTypeColor[type] || typeColor[type];
  const cssObj: CSSObject = {};

  if (weakLevel && type === 'weak' && weakLevels[weakLevel - 1]) {
    colorToken = weakLevels[weakLevel - 1];
  }
  cssObj.color = colorToken.normal;
  if (disabled) {
    cssObj.color = theme.colors.pattern.text.disabled;
  }

  const interactive = !(busy || disabled || loading);
  let interactiveCSS;
  if (interactive && !constant) {
    let colorItem = colorToken;
    if (highlightNeutralColorButtonType(type)) {
      colorItem = typeColor.primary;
    }
    interactiveCSS = css`
      cursor: pointer;
      &:hover {
        color: ${colorItem.hover};
      }
      &:active {
        color: ${colorItem.click};
      }
    `;
  } else if (!constant) {
    interactiveCSS = css`
      cursor: not-allowed;
    `;
  } else {
    interactiveCSS = css`
      cursor: default;
    `;
  }

  if (!disabled && (busy || loading)) {
    cssObj.opacity = theme.opacity.pattern.disabled;
  }

  if (width) {
    cssObj.width = addPx(width);
  }

  const baseCSS = css(cssObj);
  return css`
    ${baseCSS}
    font-weight: ${fontWeight};
    font-size: ${fontSize[size]}px;
    ${interactiveCSS}
    ${siblingCss(size, theme, false, disableSiblingMargin)}
  `;
}

const InlineButtonWithoutTheme = styled(InlineButtonPure)`
  ${props => {
    const { textFine, fontWeight: propFontWeight } = props;
    let innerFontWeight = propFontWeight;
    if (!innerFontWeight && textFine) {
      innerFontWeight = 'lighter';
    }
    const newProps = {
      ...props,
      fontWeight: innerFontWeight,
    };

    return css`
      background: transparent;
      border: none;
      padding: 0;
      ${buttonCSS(newProps)}
    `;
  }}
`;

const InlineButton = withThemeForStyled(InlineButtonWithoutTheme);
(InlineButton as any).__MUYA_BUTTON = true;
export default InlineButton;
