import styled, { css } from 'styled-components';

import { IComponentSizeSpec, IFontSizeSpec } from '@muya-ui/theme-light';

import { ellipsisWithWidth } from '../styled/mixins/ellipsis';
import { IThemedBaseProps } from '../types';

export interface IStyledRadioInnerProps extends IThemedBaseProps {
  $size: IComponentSizeSpec;
  $checked: boolean;
}

export interface IStyledTextProps extends IThemedBaseProps {
  $size: IComponentSizeSpec;
}

export interface IStyledRadioLabelProps extends IThemedBaseProps {
  $disabled: boolean;
  $checked: boolean;
  $width?: string | number;
  $ellipsis: boolean;
}

export const StyledRadioInput = styled.input`
  box-sizing: border-box;
  touch-action: manipulation;
  position: absolute;
  z-index: 1;
  cursor: pointer;
  opacity: 0;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;

export const StyledRadioIcon = styled.span`
  position: relative;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  outline: none;
  cursor: pointer;
`;

const radioInnerCSS = (props: IStyledRadioInnerProps) => {
  const {
    theme: {
      components: { Radio: token },
      transition: {
        spec: { duration, easing },
      },
    },
    $size,
    $checked,
  } = props;
  const iconSize = token.iconSize[$size!];
  const checkedCenterSize = token.checkedCenterSize[$size!];

  return css`
    transition: all ${duration.normal}ms ${easing.easeInOut};
    width: ${iconSize}px;
    height: ${iconSize}px;
    border-width: 1px;
    border-color: ${$checked ? token.borderColor.checked : token.borderColor.unChecked};
    background-color: ${$checked ? token.iconColor.checked : token.iconColor.unChecked};
    &::after {
      content: '';
      width: ${checkedCenterSize}px;
      height: ${checkedCenterSize}px;
      background: ${token.checkedCenterBg};
      transform: ${$checked ? 'scale(1)' : 'scale(0)'};
      position: absolute;
      border-radius: 50%;
      top: ${(iconSize - checkedCenterSize) / 2}px;
      left: ${(iconSize - checkedCenterSize) / 2}px;
      transition: all ${duration.normal}ms ${easing.easeInOut};
    }
  `;
};

export const StyledRadioInner = styled.span`
  display: block;
  box-sizing: border-box;
  border-radius: 50%;
  border-style: solid;
  ${radioInnerCSS}
`;

const textSizeCSS = (props: IStyledTextProps) => {
  const {
    theme: {
      colors,
      typography: {
        spec: { fontSize, lineHeight },
      },
      spacing: {
        pattern: { textIcon },
      },
      components: { Radio: token },
    },
    $size,
  } = props;
  const fontLevel = token.fontLevel[$size!] as IFontSizeSpec;
  return css`
    color: ${colors.pattern.text.text};
    font-size: ${fontSize[fontLevel]}px;
    line-height: ${lineHeight[fontLevel]}px;
    padding-left: ${textIcon[fontLevel]}px;
    padding-right: ${textIcon[fontLevel]}px;
  `;
};

export const StyledRadioText = styled.span`
  vertical-align: middle;
  ${textSizeCSS}
`;

// 状态的样式
const radioStatusCSS = (props: IStyledRadioLabelProps) => {
  const {
    theme: {
      opacity,
      components: { Radio: token },
    },
    $disabled,
    $checked,
    $width,
    $ellipsis,
  } = props;

  const interactive = !$disabled;
  let interactiveCSS;
  if (!interactive) {
    interactiveCSS = css`
      opacity: ${opacity.pattern.disabled};
      cursor: not-allowed;
      ${StyledRadioInput}, ${StyledRadioIcon} {
        cursor: not-allowed;
      }
    `;
  } else {
    interactiveCSS = css`
      &:focus,
      &:hover {
        ${StyledRadioInner} {
          border-color: ${$checked ? token.borderColor.checkedHover : token.borderColor.hover};
          background-color: ${$checked ? token.iconColor.checkedHover : token.iconColor.hover};
        }
      }
      &:active {
        ${StyledRadioInner} {
          border-color: ${$checked ? token.borderColor.checkedClick : token.borderColor.click};
          background-color: ${$checked ? token.borderColor.checkedClick : token.iconColor.click};
        }
      }
    `;
  }

  return css`
    ${ellipsisWithWidth($ellipsis, $width)}
    ${interactiveCSS}
  `;
};

export const StyledRadioLabel = styled.label`
  box-sizing: border-box;
  user-select: none;
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  ${radioStatusCSS}
`;

export const StyledRadioGroup = styled.div<IThemedBaseProps>`
  display: inline-block;
  ${StyledRadioLabel} {
    margin-right: ${props => props.theme.components.Radio.marginRightInGroup}px;
  }
`;
