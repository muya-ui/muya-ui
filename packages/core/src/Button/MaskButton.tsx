import React from 'react';
import styled, { css, ThemedStyledProps } from 'styled-components';

import { colorUtils, ITheme } from '@muya-ui/theme-light';

import { withThemeForStyled } from '../utils/withTheme';
import ButtonCore from './ButtonCore';
import { buttonSizeCSS, siblingCss } from './mixins';
import { IButtonNode, IMaskButtonProps } from './types';

const MaskButtonPure = React.forwardRef<IButtonNode, IMaskButtonProps>((props, ref) => {
  const { shape, block, ...otherProps } = props;

  return <ButtonCore ref={ref} {...otherProps} />;
});

// 状态的样式
function maskButtonStatusCSS(props: ThemedStyledProps<IMaskButtonProps, ITheme>) {
  const { theme, busy, disabled, loading } = props;
  const { components, opacity } = theme;
  const { defaultColor, maskColor } = components.Button;

  let bgColor = colorUtils.transparentize(opacity.spec.s3, maskColor);
  const disabledColor = theme.colors.pattern.text.disabled;

  const interactive = !(busy || disabled || loading);
  let interactiveCSS;
  if (interactive) {
    const bgHoverColor = colorUtils.transparentize(opacity.spec.s2, maskColor);
    interactiveCSS = css`
      cursor: pointer;
      &:hover {
        background-color: ${bgHoverColor};
      }
    `;
  } else {
    interactiveCSS = css`
      cursor: not-allowed;
    `;
  }

  if (disabled) {
    bgColor = disabledColor;
  }
  return css`
    color: ${defaultColor};
    user-select: none;
    background-color: ${bgColor};
    ${!interactive && !disabled && `opacity: ${opacity.pattern.disabled};`}
    ${interactiveCSS}
  `;
}

const MaskButtonWithoutTheme = styled(MaskButtonPure)`
  ${props => {
    const { size = 'm', theme, disableSiblingMargin = false, fontWeight, textFine } = props;
    let innerFontWeight = fontWeight;
    if (!innerFontWeight && textFine) {
      innerFontWeight = 'lighter';
    }
    const newProps = {
      ...props,
      size,
      fontWeight: innerFontWeight,
    };
    return css`
      border: none;
      ${buttonSizeCSS(newProps)}
      ${maskButtonStatusCSS(newProps)}
      ${siblingCss(size, theme, false, disableSiblingMargin)}
    `;
  }}
`;

const MaskButton = withThemeForStyled(MaskButtonWithoutTheme);
(MaskButton as any).__MUYA_BUTTON = true;
export default MaskButton;
