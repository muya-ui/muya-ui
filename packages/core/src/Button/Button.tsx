import React from 'react';
import styled, { css, CSSObject, ThemedStyledProps } from 'styled-components';

import { colorUtils, ITheme } from '@muya-ui/theme-light';

import { withThemeForStyled } from '../utils/withTheme';
import ButtonCore from './ButtonCore';
import { buttonSizeCSS, highlightNeutralColorButtonType, siblingCss } from './mixins';
import { IButtonNode, IButtonProps, IButtonType } from './types';

const ButtonPure = React.forwardRef<IButtonNode, IButtonProps>((props, ref) => {
  const { type, shape, block, groupType, offBorder, plain, selected, ...otherProps } = props;

  return <ButtonCore ref={ref} {...otherProps} />;
});

const buttonInGroupCss = (groupType: IButtonProps['groupType']) => {
  return css`
    ${groupType === 'head' &&
      css`
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      `}

    ${groupType === 'tail' &&
      css`
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        margin-left: -1px;
      `}
  `;
};

interface IButtonCSSConfig {
  style: CSSObject;
  hoverStyle?: CSSObject;
  clickStyle?: CSSObject;
}
export function mergeCSSConfig(a: IButtonCSSConfig, b: IButtonCSSConfig) {
  return {
    style: {
      ...a.style,
      ...b.style,
    },
    hoverStyle: {
      ...a.hoverStyle,
      ...b.hoverStyle,
    },
    clickStyle: {
      ...a.clickStyle,
      ...b.clickStyle,
    },
  };
}

const buttonBorderCSS = (
  theme: ITheme,
  plain?: boolean,
  groupType?: IButtonProps['groupType'],
  offBorder?: IButtonProps['offBorder'],
  busyOrLoading?: boolean,
) => {
  const { plainIsLight } = theme.components.Button;

  const groupCSSObj: CSSObject = {};
  // 面性的按钮在 ButtonGroup 中需要设置 border
  if ((!plain || plainIsLight) && groupType) {
    if (groupType !== 'tail') {
      groupCSSObj.borderRightWidth = '1px';
      groupCSSObj.borderRightStyle = 'solid';
    }

    if (groupType !== 'head') {
      groupCSSObj.borderLeftWidth = '1px';
      groupCSSObj.borderLeftStyle = 'solid';
    }
  }

  // 在 busy 或者 loading 时整体会有透明度，导致中间的border颜色变深
  // 需要处理一下
  if (busyOrLoading) {
    if (offBorder === 'both' || offBorder === 'right') {
      groupCSSObj.borderRightColor = 'transparent';
    }

    if (offBorder === 'both' || offBorder === 'left') {
      groupCSSObj.borderLeftColor = 'transparent';
    }
  }

  const noBorderGroupCSS = css(groupCSSObj);

  let borderCss;
  if (plain && !plainIsLight) {
    borderCss = css`
      border-style: solid;
      border-width: 1px;
    `;
  } else {
    borderCss = css`
      border-width: 0;
    `;
  }

  return css`
    ${borderCss}
    ${noBorderGroupCSS}
  `;
};

/* eslint-disable complexity */
function getOneTypeOfButton(
  theme: ITheme,
  type: IButtonType,
  interactive: boolean,
  plain?: boolean,
): IButtonCSSConfig {
  const {
    typeColor,
    defaultColor,
    typeBgImage,
    statusOpacity,
    textColor,
    lightTypeColor,
    plainIsLight,
    plainColorHighlight,
    borderColor: typeBorderColor,
    typeBgColor,
  } = theme.components.Button;
  const currentBgImage = typeBgImage[type];
  const currentColor = typeColor[type];
  const currentLightColor = lightTypeColor[type];
  const currentBgColor = typeBgColor[type];
  let currentTypeUseBgImage = !!currentBgImage;

  let borderColor;

  // 当是面性的按钮时，在 ButtonGroup 中是有 border 的
  // 需要设置 borderColor
  if (plain && plainIsLight) {
    borderColor = currentLightColor.hover;
  } else if (plain) {
    borderColor = typeBorderColor[type];
  } else {
    borderColor = currentColor.hover;
  }

  let color: string;
  if (plain) {
    color = currentColor.normal;
  } else if (textColor[type]) {
    color = textColor[type]!;
  } else {
    color = defaultColor;
  }

  let bgColor;
  if (plain && plainIsLight) {
    bgColor = currentLightColor.normal;
  } else if (plain) {
    bgColor = 'transparent';
  } else if (currentBgColor) {
    bgColor = currentBgColor.normal;
  } else {
    bgColor = currentColor.normal;
  }

  let hoverColor;
  let hoverBackgroundImage;
  let hoverBackgroundColor;
  let hoverBorderColor;

  let clickColor;
  let clickBackgroundImage;
  let clickBackgroundColor;
  let clickBorderColor;

  if (interactive) {
    if (plain && !plainIsLight) {
      hoverBackgroundColor = colorUtils.transparentize(statusOpacity.hover, color);
      clickBackgroundColor = colorUtils.transparentize(statusOpacity.click, color);
    } else if (plain) {
      hoverBackgroundColor = currentLightColor.hover;
      clickBackgroundColor = currentLightColor.click;
    } else if (currentTypeUseBgImage) {
      hoverBackgroundImage = currentBgImage!.hover;
      clickBackgroundImage = currentBgImage!.click;
    } else if (currentBgColor) {
      hoverBackgroundColor = currentBgColor.hover;
      clickBackgroundColor = currentBgColor.click;
    } else {
      hoverBackgroundColor = currentColor.hover;
      clickBackgroundColor = currentColor.click;
    }

    if (plain && plainColorHighlight && highlightNeutralColorButtonType(type)) {
      hoverColor = typeColor.primary.hover;
      clickColor = typeColor.primary.click;
      hoverBorderColor = typeColor.primary.hover;
      clickBorderColor = typeColor.primary.click;
    } else {
      hoverColor = color;
      clickColor = color;
    }
  }

  let backgroundImage;
  let backgroundColor;
  // 不是线框的按钮，同时使用背景
  if (!plain && currentTypeUseBgImage) {
    backgroundImage = currentBgImage!.normal;
  } else {
    backgroundColor = bgColor;
  }

  let busyOpacity;
  if (!interactive) {
    busyOpacity = theme.opacity.pattern.disabled;
  }

  return {
    style: {
      color,
      backgroundImage,
      backgroundColor,

      opacity: busyOpacity,
      cursor: interactive ? 'pointer' : 'not-allowed',
      borderColor,
    },
    hoverStyle: {
      color: hoverColor,
      backgroundImage: hoverBackgroundImage,
      backgroundColor: hoverBackgroundColor,

      borderColor: hoverBorderColor || borderColor,
    },
    clickStyle: {
      color: clickColor,
      backgroundImage: clickBackgroundImage,
      backgroundColor: clickBackgroundColor,

      borderColor: clickBorderColor || borderColor,
    },
  };
}

/* eslint-enable complexity */

function getDisabledButtonConfig(theme: ITheme, plain?: boolean): IButtonCSSConfig {
  const { defaultColor, plainIsLight } = theme.components.Button;
  const disabledColor = theme.colors.pattern.text.disabled;

  let color = defaultColor;
  let borderColor;
  let backgroundColor;

  // 如果是线框的
  if (plain && !plainIsLight) {
    color = disabledColor;
    borderColor = disabledColor;
    backgroundColor = 'transparent';
  } else {
    borderColor = defaultColor;
    backgroundColor = disabledColor;
  }

  return {
    style: {
      cursor: 'not-allowed',
      color,
      backgroundColor,
      borderColor,
    },
  };
}

function getButtonConfigInGroup(
  theme: ITheme,
  type: IButtonType,
  selected?: boolean,
): IButtonCSSConfig {
  const { hoverZIndex, selectedZIndex, zIndexOrder } = theme.components.Button;
  const currentZIndex = zIndexOrder[type];
  let activeZIndex;
  if (selected) {
    activeZIndex = selectedZIndex;
  } else {
    activeZIndex = hoverZIndex;
  }

  let normalZIndex;
  if (currentZIndex && selected) {
    normalZIndex = selectedZIndex;
  } else if (currentZIndex) {
    normalZIndex = currentZIndex;
  }
  return {
    style: {
      zIndex: normalZIndex,
    },
    clickStyle: {
      zIndex: activeZIndex,
    },
    hoverStyle: {
      zIndex: activeZIndex,
    },
  };
}

// 状态的样式
function buttonCSS(props: ThemedStyledProps<IButtonProps, ITheme>) {
  const {
    size = 'm',
    type = 'normal',
    plain,
    theme,
    busy,
    disabled,
    loading,
    groupType,
    offBorder,
    selected,
    disableSiblingMargin = false,
  } = props;
  const interactive = !(busy || disabled || loading);
  const baseConfig = disabled
    ? getDisabledButtonConfig(theme, plain)
    : getOneTypeOfButton(theme, type, interactive, plain);
  let config;
  if (groupType) {
    const groupConfig = getButtonConfigInGroup(theme, type, selected);
    config = mergeCSSConfig(baseConfig, groupConfig);
  } else {
    config = baseConfig;
  }

  const normalCss = css(config.style);
  let interactiveCss;
  if (interactive && config.hoverStyle && config.clickStyle) {
    interactiveCss = css`
      &:hover {
        ${css(config.hoverStyle)}
      }
      &:active {
        ${css(config.clickStyle)}
      }
    `;
  }
  const busyOrLoading = busy || loading;

  return css`
    ${normalCss}
    ${interactiveCss}
    ${buttonBorderCSS(theme, plain, groupType, offBorder, busyOrLoading)}
    ${siblingCss(size, theme, !!groupType, disableSiblingMargin)}
  `;
}

const Button = styled(ButtonPure)<IButtonProps>`
  ${props => {
    const { type, selected, groupType, plain, textFine, fontWeight } = props;
    let innerPlain = plain;
    let innerType = type;
    if (!innerType && selected === true) {
      innerType = 'primary';
    } else if (!innerType && selected === false) {
      innerType = 'secondary';
    } else if (!innerType) {
      innerType = 'normal';
    }
    if (innerType === 'normal' && plain === undefined) {
      innerPlain = true;
    }
    let innerFontWeight = fontWeight;
    if (!innerFontWeight && textFine) {
      innerFontWeight = 'lighter';
    }
    const newProps = {
      ...props,
      type: innerType,
      plain: innerPlain,
      fontWeight: innerFontWeight,
    };
    return css`
      user-select: none;
      ${buttonSizeCSS(newProps)}
      ${buttonInGroupCss(groupType)}
      ${buttonCSS(newProps)}
    `;
  }}
`;
(Button as any).__MUYA_BUTTON = true;
export default withThemeForStyled(Button);
